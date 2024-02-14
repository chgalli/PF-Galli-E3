import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, map, mergeMap, of } from 'rxjs';

import { Usuarios } from './Models';
import { Inscripciones } from "../inscriptions/Models";

import { enviroment } from "../../../../../enviroments/enviroment";


let usuarios: Usuarios[] = []
let inscripciones: Inscripciones[] = []

@Injectable()
export class StudentsService {

    constructor(private httpClient: HttpClient) { }

    getUsuarios() {
        return this.httpClient.get<Usuarios[]>(`${enviroment.apiURL}users`);
    }

    deleteUsuariosByID(id: string) {
        return this.httpClient.delete(`${enviroment.apiURL}users/${id}`)
        .pipe(mergeMap(() => this.getUsuarios()));
    }

    deleteSubjectByID(id: string){
        return this.httpClient.delete(`${enviroment.apiURL}courses/${id}`)
        .pipe(mergeMap(() => this.getUsuarios()));
    }

    addUsuarios(data: Usuarios) {
        return this.httpClient.
        post<Usuarios>(`${enviroment.apiURL}users`,data)
        .pipe(mergeMap(() => this.getUsuarios()));
    }

    updateUsuarios(id: string, data: Usuarios): Observable<Usuarios[]> {
        return this.httpClient.put<Usuarios[]>(`${enviroment.apiURL}users/${id}`, data)
        .pipe(
            mergeMap(() => this.getUsuarios())
        );
    }

    comprobarCursos(dataA: Usuarios, DataI: Inscripciones[]): Observable<Inscripciones[]> {
        return of(DataI.filter((el) => el.IDAlumno === dataA.IDUsuario));
    }

    getAuth(email: string, clave: string): Observable<Usuarios | undefined> {
        return this.httpClient.get<Usuarios[]>(`${enviroment.apiURL}users`).pipe(
            map(usuarios => usuarios.find(u => u.Correo === email && u.Clave === clave))
        );
    }


}
