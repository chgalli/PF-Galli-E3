import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, mergeMap, of } from 'rxjs';

import { Inscripciones } from './Models';
import { Cursos } from "../subjects/Models";
import { Usuarios } from "../students/Models";

import { StudentsService } from '../students/students.service';
import { enviroment } from "../../../../../enviroments/enviroment";

let inscrip: Inscripciones[] = []

@Injectable()
export class InscriptionsService {
    constructor(private studentsService: StudentsService, private httpClient: HttpClient) { }

    getInscripciones() {
        return this.httpClient.get<Inscripciones[]>(`${enviroment.apiURL}inscriptions`);
    }

    deleteInscripcionesByID(id: string) {
        return this.httpClient.delete(`${enviroment.apiURL}inscriptions/${id}`)
        .pipe(mergeMap(() => this.getInscripciones()));
    }

    addInscipciones(data: Inscripciones, dataA: Usuarios[], dataC: Cursos[]) {
        let alumno: Usuarios | undefined = this.obtenerAlumno(data.NombreAlumno, dataA);
        let curso: Cursos | undefined = this.obtenerCurso(data.NombreCurso, dataC);

        if (alumno) {
            data.IDAlumno = alumno.IDUsuario;
            if (curso) {
                data.IDCurso = curso.IDCurso;
                return this.httpClient.
                    post<Inscripciones>(`${enviroment.apiURL}inscriptions`, data)
                    .pipe(mergeMap(() => this.getInscripciones()));
            }
        }
        return this.getInscripciones();
    }

    updateInscripciones(id: string, data: Inscripciones, dataC: Cursos[]): Observable<Inscripciones[]> {
        let curso: Cursos | undefined = this.obtenerCurso(data.NombreCurso, dataC);
        inscrip = inscrip.map((el) => {
            if (el.id === id) {
                return { ...el, ...data, IDCurso: curso ? curso.IDCurso : el.IDCurso };
            } else {
                return el;
            }
        });

        return this.httpClient.put<Inscripciones>(`${enviroment.apiURL}inscriptions/${id}`, data)
            .pipe(
                mergeMap(() => this.getInscripciones())
            );
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
