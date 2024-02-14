import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable, mergeMap, of } from 'rxjs';

import { Cursos } from './Models';
import { Inscripciones } from "../inscriptions/Models";
import { Usuarios } from "../students/Models";

import { enviroment } from "../../../../../enviroments/enviroment";

import { InscriptionsService } from "../inscriptions/inscriptions.service";


let cursos: Cursos[] = [
   
]

let inscripciones: Inscripciones[] = []

@Injectable()

export class SubjectsService {

    constructor(private httpClient: HttpClient, private inscriptionService: InscriptionsService) { }
    
    getCursos() {
        return this.httpClient.get<Cursos[]>(`${enviroment.apiURL}courses`);
    }


    deleteInscripcionesByID(id: string): Observable<any> {
        return this.httpClient.delete(`${enviroment.apiURL}inscriptions/${id}`)
            .pipe(
                mergeMap(() => this.inscriptionService.getInscripciones()) 
            );
    }


    deleteSubjectByID(id: string){
        return this.httpClient.delete(`${enviroment.apiURL}courses/${id}`)
        .pipe(mergeMap(() => this.getCursos()));
    }

    addCurso(data: Cursos) { 
        return this.httpClient.
        post<Usuarios>(`${enviroment.apiURL}courses`,data)
        .pipe(mergeMap(() => this.getCursos()));
    }

    updateCursos(id: string, data: Cursos) {
        cursos = cursos.map((el) => el.id === id ? {...el, ...data} : el);
    
        return this.httpClient.put<Cursos>(`${enviroment.apiURL}courses/${id}`, data)
            .pipe(
                mergeMap(() => this.getCursos())
            );
    }
    

    comprobarAlumnos(dataC: Cursos, DataI: Inscripciones[]): Observable<Inscripciones[]> {
        return of(DataI.filter((el) => el.IDCurso === dataC.IDCurso));
    }

    comprobarCursos(dataA: Usuarios, DataI: Inscripciones[]): Observable<Inscripciones[]> {
        return of(DataI.filter((el) => el.IDAlumno === dataA.IDUsuario));
    }
}