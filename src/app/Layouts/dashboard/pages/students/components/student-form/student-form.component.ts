import { Component , Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StudentsService } from '../../students.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuarios } from '../../Models';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';
import { Inscripciones } from '../../../inscriptions/Models';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})

export class StudentFormComponent {

  userForm: FormGroup;
  inscripciones: any[] = [];
  inscripcionesAlumno: any[] = [];
  viewMode: boolean;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { usuario: Usuarios, view: boolean, edit: boolean },
    private studentsService: StudentsService,
    private inscriptionsService: InscriptionsService){
      this.viewMode = this.data.view;
      this.userForm = this.fb.group({
        Nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]+$')]],
        Apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]+$')]],
        Telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
        Correo: ['', [Validators.required, Validators.email]], 
        Dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], 
        Direccion: ['', [Validators.required]],
        Usuario: ['',[Validators.required]],
        Clave: ['',[Validators.required]],
        Rol: ['',[Validators.required]],

      })

      console.log("Usuario:", this.data.usuario);
      if (this.data.edit) {
        this.userForm.patchValue(this.data.usuario);
      }
      if(this.data.view){
        this.userForm.patchValue(this.data.usuario);
        this.userForm.get('Nombre')?.disable();
        this.userForm.get('Apellido')?.disable();
        this.userForm.get('Telefono')?.disable();
        this.userForm.get('Correo')?.disable();
        this.userForm.get('Dni')?.disable();
        this.userForm.get('Direccion')?.disable();
        this.userForm.get('Usuario')?.disable();
        this.userForm.get('Clave')?.disable();
        this.userForm.get('Rol')?.disable();
      }
    }

    ngOnInit(): void {
      this.obtenerCursos();
    }
    
    obtenerCursos(): void {
      // Obtener datos de usuarios
      this.studentsService.getUsuarios().subscribe({
        next: (usuarios: Usuarios[]) => {
          // Utiliza los datos de usuarios aquí según sea necesario
    
          // Luego, obtén los datos de inscripciones
          this.inscriptionsService.getInscripciones().subscribe({
            next: (inscripciones: any[]) => {

              // Utiliza los datos de inscripciones aquí según sea necesario
              this.inscripciones = inscripciones;
    
              // Busca el usuario actual dentro de los usuarios obtenidos
              const usuarioActual = usuarios.find(user => user.IdUsuario === this.data.usuario.IdUsuario);
              if (usuarioActual) {

                // Si se encuentra el usuario, llama a la función para comprobar los cursos
                this.studentsService.comprobarCursos(usuarioActual, inscripciones).subscribe({
                  next: (inscripcionesAlumno: any[]) => {

                    // Asigna los cursos del alumno a la propiedad correspondiente
                    this.inscripcionesAlumno = inscripcionesAlumno;
                  },
                  error: (error) => {
                    console.error('Error al comprobar cursos del alumno:', error);
                  }
                });
              }
            },
            error: (error) => {
              console.error('Error al obtener las inscripciones:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener usuarios:', error);
        }
      });
    }
    
    guardar(): void {
      if (this.userForm.invalid) {
        this.markFormGroupTouched(this.userForm);
        this.showErrorMessage('Por favor, complete todos los campos correctamente.');
        return;
      }
      this.dialogRef.close(this.userForm.value);
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

    onDelete(id: number) {
      this.inscriptionsService.deleteInscripcionesByID(id).subscribe({
        next: () => {
          // Después de eliminar la inscripción, actualiza la lista de inscripciones del alumno
          this.obtenerCursos();
        },
        error: (error) => {
          console.error('Error al eliminar la inscripción:', error);
        }
      });
    }
    
}