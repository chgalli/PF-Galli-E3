import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { Cursos } from './Models';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';

import { SubjectsService } from './subjects.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {
  displayedColumns = ['Nombre', 'FechaInicio', 'FechaFin', 'Acciones'];

  cursos: Cursos[] = []
  authUser: any;

  constructor(private subjectsService: SubjectsService, public dialog: MatDialog, private authService: AuthService) {
    this.subjectsService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ups! No es posible acceder a los datos'
        });
      },
    })
  }

  ngOnInit(): void {
    this.authUser = this.authService.authUser;
  }
  
  onCreate(): void {
    this.dialog.open(SubjectFormComponent,{
      data: {view: false, edit: false}
    }).afterClosed().subscribe({
        next: (result) => {
          if (result) {
            this.subjectsService.addCurso(result).subscribe({
              next: (cursos) => {
                this.cursos = cursos;
              },
            });
          }
        }
      });
  }

  onEdit(curso: Cursos){
    this.dialog.open(SubjectFormComponent, {
      data: {view: false, edit: true, curso}
    }).afterClosed().subscribe({
      next: (result) => {
        if(result){
          this.subjectsService.updateCursos(curso.id, result).subscribe({
            next: (cursos) => (this.cursos = cursos),
          })
        }
      }
    })
  }

  onDelete(curso: Cursos) {
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
        this.subjectsService.deleteSubjectByID(curso.id).subscribe({
          next: (cursos) => {
            this.cursos = cursos;
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
              text: 'Se detectó un error al borrar el curso.'
            });
          }
        });
      }
    });
  }

  onView(cursos: Cursos){
    this.dialog.open(SubjectFormComponent, {
      data: { view: true, edit: false, curso: cursos}
    })
  }
}
