import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from './auth.service';
import { StudentsService } from '../dashboard/pages/students/students.service';
import { Usuarios } from '../dashboard/pages/students/Models';

describe('AuthService', () => {
    let authService: AuthService;
    let studentsServiceSpy: jasmine.SpyObj<StudentsService>;

    beforeEach(() => {
        const studentsServiceSpyObj = jasmine.createSpyObj('StudentsService', ['getAuth']);

        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule],
            providers: [
                AuthService,
                { provide: StudentsService, useValue: studentsServiceSpyObj }
            ]
        });

        authService = TestBed.inject(AuthService);
        studentsServiceSpy = TestBed.inject(StudentsService) as jasmine.SpyObj<StudentsService>;
    });

    it('AuthService esta definido', () => {
        expect(authService).toBeTruthy();
    });

    it('Se autentica un usuario en authUser cuando me logeo', () => {
        const mockUser: Usuarios = {
            "IDUsuario": 1,
            "Nombre": "Juan",
            "Apellido": "Perez",
            "Dni": "28456789",
            "Telefono": "1124251645",
            "Correo": "prueba@gmail.com",
            "Direccion": "Calle A, Ciudad X",
            "Usuario": "JuanP",
            "Clave": "clave",
            "Rol": "Estudiante",
            "id": "c482"
        };

        studentsServiceSpy.getAuth.and.returnValue(of(mockUser));

        authService.login({ email: 'prueba@gmail.com', clave: 'clave' });

        expect(authService.authUser).toEqual(mockUser);
        expect(authService.token).toBeTruthy();
    });

    it('Muestra una alerta de error cuando las credenciales son incorrectas', () => {
        // Configurando el servicio para devolver un observable de valor undefined,
        // simulando credenciales incorrectas
        studentsServiceSpy.getAuth.and.returnValue(of(undefined));
    
        // Espiando la función fire de Swal
        spyOn(Swal, 'fire');
    
        // Llamando al método login con credenciales incorrectas
        authService.login({ email: 'prueba@gmail.com', clave: 'clave' });
    
        // Verificando que authService.authUser sea null
        expect(authService.authUser).toBeNull();
    
        // Verificando que se haya llamado a Swal.fire con los argumentos correctos
        expect(Swal.fire).toHaveBeenCalled();
        const args = (Swal.fire as jasmine.Spy).calls.mostRecent().args[0]; 
        expect(args.icon).toBe('error');
        expect(args.title).toBe('Error de autenticación');
        expect(args.text).toBe('Usuario y/o contraseña inválidos');
    });
    
});
