import { Injectable } from "@angular/core";

import { Observable, of } from 'rxjs';
import { Inscripciones } from './Models';
import { Usuarios } from "../students/Models";
import { StudentsService } from '../students/students.service';
import { Cursos } from "../subjects/Models";
import { SubjectsService } from "../subjects/subjects.service";

let inscrip: Inscripciones[] = [
    {
        IdInscripcion: 1,
        IdUsuario: 1,
        NombreCurso: 'Angular',
        IDAlumno: 1,
        NombreAlumno: 'Pedro Magno',
        Modalidad: 'Virtual',
        Turno: 'Mañana',
    },
    {
        IdInscripcion: 2,
        IdUsuario: 2,
        NombreCurso: 'SQL Server',
        IDAlumno: 2,
        NombreAlumno: 'Luis Martinez',
        Modalidad: 'Prsencial',
        Turno: 'Tarde',
    }
]

@Injectable()
export class InscriptionsService {
    constructor(private studentsService: StudentsService, private subjectService: SubjectsService) {}

    getInscripciones(){
        return of(inscrip);
    }

    deleteInscripcionesByID(id: number){
        inscrip = inscrip.filter((el) => el.IdInscripcion != id);
        return this.getInscripciones();
    }

    addInscipciones(data: Inscripciones, dataA: Usuarios[], dataC: Cursos[]){
        let alumno: Usuarios | undefined = this.obtenerAlumno(data.NombreAlumno, dataA);
        let curso: Cursos | undefined = this.obtenerCurso(data.NombreCurso, dataC);

        if (alumno) {
            data.IDAlumno = alumno.IdUsuario;
            if(curso){
                data.IdUsuario = curso.IdCurso;
                inscrip = [...inscrip, {...data, IdInscripcion: inscrip.length + 1}];
            }
        }
        return this.getInscripciones();
    }

    updateInscripciones(id: number, data: Inscripciones){
        inscrip = inscrip.map((el) => el.IdInscripcion === id ? {...el,...data} : el);
        return this.getInscripciones();
    }

    obtenerAlumno(nombreCompleto: string, dataA: Usuarios[]): Usuarios | undefined {
        const alumno = dataA.find(alumno => `${alumno.Nombre} ${alumno.Apellido}` === nombreCompleto);
        return alumno;
    } 

    obtenerCurso(nombreCurso: string, dataA: Cursos[]): Cursos | undefined {
        const curso = dataA.find(curso => curso.Nombre === nombreCurso);
        return curso;
    } 
}
