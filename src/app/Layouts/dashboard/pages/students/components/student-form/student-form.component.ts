import { Component , Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { Usuarios } from '../../Models';
import { Inscripciones } from '../../../inscriptions/Models';

import { InscriptionsService } from '../../../inscriptions/inscriptions.service';
import { StudentsService } from '../../students.service';
import { AuthService } from '../../../../../auth/auth.service';


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
  authUser: any;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { usuario: Usuarios, view: boolean, edit: boolean },
    private studentsService: StudentsService,
    private inscriptionsService: InscriptionsService,
    private authService: AuthService){
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
      this.authUser = this.authService.authUser;
    }
    
    obtenerCursos(): void {
      this.studentsService.getUsuarios().subscribe({
        next: (usuarios: Usuarios[]) => {
          this.inscriptionsService.getInscripciones().subscribe({
            next: (inscripciones: any[]) => {
              this.inscripciones = inscripciones;
              const usuarioActual = usuarios.find(user => user.IDUsuario === this.data.usuario.IDUsuario);
              if (usuarioActual) {
                this.studentsService.comprobarCursos(usuarioActual, inscripciones).subscribe({
                  next: (inscripcionesAlumno: any[]) => {
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
        this.showErrorMessage('Completar todos los campos correctamente.');
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

    onDelete(data: Inscripciones) {
      Swal.fire({
        title: '¿Está seguro?',
        text: 'Esta acción no se podrá revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.inscriptionsService.deleteInscripcionesByID(data.id).subscribe({
            next: () => {
              this.obtenerCursos();
              Swal.fire({
                icon: 'success',
                title: 'Baja exitosa',
                showConfirmButton: false,
                timer: 1500
              });
            },
            error: (error) => {
              console.error('Error al eliminar la inscripción:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Se detectó un error al borrar la inscripción.'
              });
            }
          });
        }
      });
    }
    
}