import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import Swal from "sweetalert2";
import { delay, map, of } from "rxjs";

import { Usuarios } from "../dashboard/pages/students/Models";
import { StudentsService } from "../dashboard/pages/students/students.service";

interface LoginData {
    email: null | string;
    clave: null | string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    authUser: Usuarios | null = null;
    token: string = '';

    constructor(private router: Router, private studentService: StudentsService) { 
        // Al inicializar el servicio, intenta recuperar el usuario autenticado desde el almacenamiento local
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            this.authUser = JSON.parse(storedUser);
        }
    }

    login(data: LoginData): void {
        if (data.email && data.clave) { 
            this.studentService.getAuth(data.email, data.clave)
                .subscribe(usuario => {
                    if (usuario) {
                        this.authUser = usuario;
                        this.token = this.generarToken();
                        localStorage.setItem('authUser', JSON.stringify(this.authUser)); // Guardar en el almacenamiento local
                        localStorage.setItem('token', this.token);
                        this.router.navigate(['dashboard']);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error de autenticación',
                            text: 'Usuario y/o contraseña inválidos',
                        });
                    }
                });
        }
    }

    logout(): void{
        this.authUser = null;
        localStorage.removeItem('authUser'); // Remover del almacenamiento local
        localStorage.removeItem('token');
        this.router.navigate(['auth','login']);
    }

    generarToken(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let token = "";

        for (let i = 0; i < 10; i++) {
            token += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return token;
    }

    verifyToken(){
        return of(localStorage.getItem('token')).pipe(delay(1000),map((res) => !!res));
    }

    setAuthUser(usuario: Usuarios):void{
        this.authUser = usuario;
        localStorage.setItem('authUser', JSON.stringify(this.authUser)); // Actualizar en el almacenamiento local
    }
}
