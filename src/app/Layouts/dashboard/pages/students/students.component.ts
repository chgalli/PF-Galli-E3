import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';


import { Usuarios } from './Models';
import { StudentFormComponent } from './components/student-form/student-form.component';

import { StudentsService } from './students.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {

  displayedColumns: string[] = ['Nombre', 'Correo', 'Rol', 'Acciones'];

  usuarios: Usuarios[] = []

  authUser: any;

  constructor(private studentsService: StudentsService, public dialog: MatDialog, private authService: AuthService) {
    this.authUser = this.authService.authUser;
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.studentsService.getUsuarios().subscribe({
      next: (us) => {
        if (this.authUser && this.authUser.Rol !== 'Administrador') {
          this.usuarios = us.filter(usuario => usuario.Rol === 'Estudiante');
        } else {
          this.usuarios = us;
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ups! No es posible acceder a los datos'
        });
      },
    });
  }

  ngOnInit(): void {
    this.authUser = this.authService.authUser;
  }

  onCreate(): void {
    this.dialog.open(StudentFormComponent, {
      data: { View: false, edit: false }
    }).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.studentsService.addUsuarios(result).subscribe({
            next: (us) => {
              this.usuarios = us;
            },
          });
        }
      }
    });
  }

 

  onEdit(usuario: Usuarios) {
    this.dialog.open(StudentFormComponent, {
      data: { usuario: usuario, view: false, edit: true }
    }).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.studentsService.updateUsuarios(usuario.id, result).subscribe({
            next: (us) => (this.usuarios = us),
          })
        }
      }
    })
  }

  onView(usuario: Usuarios) {
    this.dialog.open(StudentFormComponent, {
      data: { usuario: usuario, view: true, edit: false }
    })
  }

  onDelete(data: Usuarios) {
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
        this.studentsService.deleteUsuariosByID(data.id).subscribe({
          next: (us) => {
            this.usuarios = us;
            Swal.fire({
              icon: 'success',
              title: 'Borrado exitoso',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (error) => {
            console.error('Error al borrar:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se detectó un error al borrar el usuario.'
            });
          }
        });
      }
    });
  }

}