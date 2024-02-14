import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { Inscripciones } from '../../Models';

import { SubjectsService } from '../../../subjects/subjects.service';
import { StudentsService } from '../../../students/students.service';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss']
})
export class InscriptionFormComponent implements OnInit {
  inscriptionForm: FormGroup;
  cursos: any[] = []; 
  usuarios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InscriptionFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { inscripcion: Inscripciones, view: boolean, edit: boolean },
    private subjectsService: SubjectsService,
    private studentsService: StudentsService,
  ) {
    this.inscriptionForm = this.fb.group({
      NombreCurso: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]+$')]],
      NombreAlumno: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]],
      Modalidad: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]],
      Turno: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$')]],
    });

    if (this.data.view) {
      this.inscriptionForm.patchValue(this.data.inscripcion);
      this.inscriptionForm.get('NombreCurso')?.disable();
      this.inscriptionForm.get('NombreAlumno')?.disable();
    } 
    if(this.data.edit) {
      this.inscriptionForm.patchValue(this.data.inscripcion);
    }
  }

  
  ngOnInit(): void {
    this.subjectsService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });

    this.studentsService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    })

    this.inscriptionForm?.get('NombreCurso')?.valueChanges.subscribe(nombreCurso => {
      const cursoSeleccionado = this.cursos.find(curso => curso.Nombre === nombreCurso);
      if (cursoSeleccionado) {
        this.inscriptionForm?.get('Modalidad')?.setValue(cursoSeleccionado.Modalidad);
        this.inscriptionForm?.get('Turno')?.setValue(cursoSeleccionado.Turno);
      } else {
        this.inscriptionForm?.get('Modalidad')?.setValue('');
        this.inscriptionForm?.get('Turno')?.setValue('');
      }
    });
  }


  guardar(): void {
    if (this.inscriptionForm.invalid) {
      this.markFormGroupTouched(this.inscriptionForm);
      this.showErrorMessage('Completar todos los campos correctamente.');
      return;
    }
    this.inscriptionForm.get('Modalidad')?.enable();
    this.inscriptionForm.get('Turno')?.enable();

    this.dialogRef.close(this.inscriptionForm.value);

    this.inscriptionForm.get('Modalidad')?.disable();
    this.inscriptionForm.get('Turno')?.disable();
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
}
