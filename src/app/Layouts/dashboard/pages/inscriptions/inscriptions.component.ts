import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InscriptionsService } from './inscriptions.service';
import { Inscripciones } from './Models';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { Usuarios } from '../students/Models';
import { StudentsService } from '../students/students.service';
import { Cursos } from '../subjects/Models';
import { SubjectsService } from '../subjects/subjects.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})

export class InscriptionsComponent {
  displayedColumns = ['NombreCurso', 'NombreAlumno', 'Acciones'];

  inscrip: Inscripciones[] = []
  usuarios: Usuarios[] = []
  cursos: Cursos[] = []

  constructor(private inscriptionsService: InscriptionsService, private studentsService: StudentsService, private subjectsService: SubjectsService, public dialog: MatDialog){
    this.inscriptionsService.getInscripciones().subscribe({
      next: (inscrip) =>{
        this.inscrip = inscrip;
      }
    })

    this.studentsService.getUsuarios().subscribe({
      next: (us) =>{
        this.usuarios = us;
      }
    })

    this.subjectsService.getCursos().subscribe({
      next: (cu) => {
        this.cursos = cu;
      }
    })
  }

  
  onCreate(): void {
    this.dialog.open(InscriptionFormComponent, {
      data: {View: false, edit: false}
    }).afterClosed().subscribe({
        next: (result) => {
          if (result) {
            this.inscriptionsService.addInscipciones(result,this.usuarios,this.cursos).subscribe({
              next: (Inscripcion) => {
                this.inscrip = Inscripcion;
              },
            });
          }
        }
      });
  }

  onEdit(inscripcion: Inscripciones){
    this.dialog.open(InscriptionFormComponent, {
      data: { inscripcion: inscripcion, View: false, edit: true  }
    }).afterClosed().subscribe({
      next: (result) => {
        if(result){
          this.inscriptionsService.updateInscripciones(inscripcion.IdInscripcion, result).subscribe({
            next: (inscripciones) => (this.inscrip = inscripciones),
          })
        }
      }
    })
  }

  onView(inscripcion: Inscripciones) {
    this.dialog.open(InscriptionFormComponent, {
      data: { inscripcion: inscripcion, view: true, edit: false } 
    })
  }
  

  onDelete(id: number) {
    this.inscriptionsService.deleteInscripcionesByID(id).subscribe({
      next: (inscripcion) => {
        this.inscrip = inscripcion;
      }
    })
  }

}




