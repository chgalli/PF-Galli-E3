import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Usuarios } from './Models';
import { Inscripciones } from "../inscriptions/Models";


let usuarios: Usuarios[] = [
    { IdUsuario: 1, Nombre: 'Pedro', Apellido: "Magno", Dni: "40125854", Telefono: "1133415470", Correo: 'pmagno@mail.com', Direccion: 'Calle A, Ciudad X', Usuario: "JuanP", Clave: "JuanP", Rol: "Estudiante" },
    { IdUsuario: 2, Nombre: 'Lucas', Apellido: 'Guabalt', Dni: '29458521', Telefono: '1138785478', Correo: 'lguabalt@mail.com', Direccion: 'Calle B, Ciudad Y', Usuario: 'MariaG', Clave: 'MariaG', Rol: 'Estudiante'},
    { IdUsuario: 3, Nombre: 'Jimena', Apellido: 'Rodriguez', Dni: '41278840', Telefono: '1144452478', Correo: 'jrodriguez@mail.com', Direccion: 'Calle C, Ciudad Z', Usuario: 'CarlosR', Clave: 'CarlosR', Rol: 'Estudiante'},
    { IdUsuario: 4, Nombre: 'Romina', Apellido: 'Peralta', Dni: '27101217', Telefono: '1114875201', Correo: 'rperalta@mail.com', Direccion: 'Calle D, Ciudad W', Usuario: 'AnaL', Clave: 'AnaL', Rol: 'Estudiante' },
    { IdUsuario: 5, Nombre: 'Matias', Apellido: 'De Leon', Dni: '44775501', Telefono: '1145248720', Correo: 'mdeleaon@mail.com', Direccion: 'Calle E, Ciudad V', Usuario: 'LuisM', Clave: 'LuisM', Rol: 'Profesor'},
  ]

  let inscripciones: Inscripciones[] = []

  @Injectable()
export class StudentsService {
    getUsuarios(){
        return of(usuarios);
    }

    deleteUsuariosByID(id: number){
        usuarios = usuarios.filter((el) => el.IdUsuario != id);
        return this.getUsuarios();
    }

    deleteInscripcionesByID(id:number){
        inscripciones = inscripciones.filter((el) => el.IdInscripcion != id);
        return of(inscripciones);
    }

    addUsuarios(data: Usuarios){
        usuarios = [...usuarios, {...data, IdUsuario: usuarios.length + 1}];
        return this.getUsuarios();
    }

    updateUsuarios(id: number, data: Usuarios){
        usuarios = usuarios.map((el) => el.IdUsuario === id ? {...el,...data} : el);
        return this.getUsuarios();
    }

    comprobarCursos(dataA: Usuarios, DataI: Inscripciones[]): Observable<Inscripciones[]> {
        return of(DataI.filter((el) => el.IDAlumno === dataA.IdUsuario));
    }
    
}
