import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SubjectsService } from './subjects.service';
import { Cursos } from './Models';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {
  displayedColumns = ['Nombre', 'FechaInicio', 'FechaFin', 'Modalidad', 'Turno', 'Acciones'];
  
  cursos: Cursos[] = []

  constructor(private subjectsService: SubjectsService, public dialog: MatDialog) {
    this.subjectsService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      }
    })
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
          this.subjectsService.updateCursos(curso.IdCurso, result).subscribe({
            next: (cursos) => (this.cursos = cursos),
          })
        }
      }
    })
  }

  onDelete(id: number) {
    this.subjectsService.deleteSubjectByID(id).subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      }
    })
  }

  onView(cursos: Cursos){
    this.dialog.open(SubjectFormComponent, {
      data: { view: true, edit: false, curso: cursos}
    })
  }
}
