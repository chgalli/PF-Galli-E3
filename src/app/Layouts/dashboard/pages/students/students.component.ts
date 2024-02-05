import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StudentsService } from './students.service';
import { Usuarios } from './Models';
import { StudentFormComponent } from './components/student-form/student-form.component';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {
  
  displayedColumns: string[] = ['Nombre', 'Telefono', 'Correo', 'Rol', 'Acciones'];

  usuarios: Usuarios[] = []

  constructor(private studentsService: StudentsService, public dialog: MatDialog){
    this.studentsService.getUsuarios().subscribe({
      next: (us) =>{
        this.usuarios = us;
      }
    })
  }

  onCreate(): void {
    this.dialog.open(StudentFormComponent,{
      data: {View: false, edit: false}
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

  onEdit(usuario: Usuarios){
    this.dialog.open(StudentFormComponent, {
      data: {usuario: usuario, view: false, edit: true}
    }).afterClosed().subscribe({
      next: (result) => {
        if(result){
          this.studentsService.updateUsuarios(usuario.IdUsuario, result).subscribe({
            next: (us) => (this.usuarios = us),
          })
        }
      }
    })
  }

  onView(usuario: Usuarios){
    this.dialog.open(StudentFormComponent, {
      data: {usuario: usuario, view: true, edit: false}
    })
  }

  onDelete(id: number) {
    this.studentsService.deleteUsuariosByID(id).subscribe({
      next: (us) => {
        this.usuarios = us;
      }
    })
  }
}