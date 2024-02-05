import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Cursos } from './Models';
import { Inscripciones } from "../inscriptions/Models";
import { Usuarios } from "../students/Models";


let cursos: Cursos[] = [
    {
        IdCurso: 1,
        Nombre: 'ANGULAR',
        FechaInicio: new Date(),
        FechaFin: new Date(),
        Docente: 'Ivan Roble',
        Costo: 45000,
        Modalidad: 'Virtual',
        Capacidad: 100,
        Inscriptos: 1,
        Estado: true,
        Descripcion: 'Primeros pasos para el desarrollo de aplicaciones web utilizando Angular',
        Turno: "Mañana",
    },
    {
        IdCurso: 2,
        Nombre: 'SQL Server',
        FechaInicio: new Date(),
        FechaFin: new Date(),
        Docente: 'Esteban Plater',
        Costo: 32000,
        Modalidad: 'Presencial',
        Capacidad: 30,
        Inscriptos: 1,
        Estado: true,
        Descripcion: 'Administración y gestión de base de datos SQL Server',
        Turno: "Tarde",
    },
    {
        IdCurso: 3,
        Nombre: 'Javascript',
        FechaInicio: new Date(),
        FechaFin: new Date(),
        Docente: 'Jose Tatorano',
        Costo: 28000,
        Modalidad: 'Virtual',
        Capacidad: 100,
        Inscriptos: 0,
        Estado: true,
        Descripcion: 'Instroducción a Javascript para el desarrollo de aplicaciones web enriquecidas',
        Turno: "Noche",
    },
]

let inscripciones: Inscripciones[] = []

@Injectable()

export class SubjectsService {

    getCursos() {
        return of(cursos);
    }

    deleteSubjectByID(id: number){
        cursos = cursos.filter((el) => el.IdCurso != id);
        return this.getCursos();
    }

    deleteInscripcionesByID(id:number){
        inscripciones = inscripciones.filter((el) => el.IdInscripcion != id);
        return of(inscripciones);
    }

    addCurso(data: Cursos) {
        cursos = [...cursos, { ...data, IdCurso: cursos.length + 1, Estado: true, }];
        return this.getCursos();
    }

    updateCursos(id: number, data: Cursos){
        cursos = cursos.map((el) => el.IdCurso === id ? {...el,...data} : el);
        return this.getCursos();
    }

    comprobarAlumnos(dataC: Cursos, DataI: Inscripciones[]): Observable<Inscripciones[]> {
        return of(DataI.filter((el) => el.IdUsuario === dataC.IdCurso));
    }
}