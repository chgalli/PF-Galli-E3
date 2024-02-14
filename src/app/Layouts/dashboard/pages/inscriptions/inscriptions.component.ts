import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';

import { Inscripciones } from './Models';
import { Usuarios } from '../students/Models';
import { Cursos } from '../subjects/Models';

import { StudentsService } from '../students/students.service';
import { SubjectsService } from '../subjects/subjects.service';
import { InscriptionsService } from './inscriptions.service';
import { AuthService } from '../../../auth/auth.service';

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
  authUser: any;

  constructor(private inscriptionsService: InscriptionsService, private studentsService: StudentsService, private subjectsService: SubjectsService, public dialog: MatDialog, private authService: AuthService) {
    this.inscriptionsService.getInscripciones().subscribe({
      next: (inscrip) => {
        this.inscrip = inscrip;
      }
    })

    this.studentsService.getUsuarios().subscribe({
      next: (us) => {
        this.usuarios = us;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ups! No es posible acceder a los datos'
        });
      },
    })

    this.subjectsService.getCursos().subscribe({
      next: (cu) => {
        this.cursos = cu;
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
    this.dialog.open(InscriptionFormComponent, {
      data: { View: false, edit: false }
    }).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.inscriptionsService.addInscipciones(result, this.usuarios, this.cursos).subscribe({
            next: (Inscripcion) => {
              this.inscrip = Inscripcion;
            },
          });
        }
      }
    });
  }

  onEdit(inscripcion: Inscripciones) {
    this.dialog.open(InscriptionFormComponent, {
      data: { inscripcion: inscripcion, View: false, edit: true }
    }).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.inscriptionsService.updateInscripciones(inscripcion.id, result, this.cursos).subscribe({
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
          next: (inscripcion) => {
            this.inscrip = inscripcion;
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
              text: 'Se detectó un error al borrar la inscripción.'
            });
          }
        });
      }
    });
  }


}




