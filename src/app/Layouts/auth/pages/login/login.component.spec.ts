import { TestBed } from "@angular/core/testing";
import { Validators } from '@angular/forms';
import { MockProvider } from "ng-mocks";

import { SharedModule } from '../../../../shared/shared.module'

import { AuthService } from "../../auth.service";
import { AuthRoutingModule } from '../../auth-routing.module';
import { LoginComponent } from "./login.component"

describe('LoginComponent', () => {

    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [MockProvider(AuthService)],
            imports: [
                SharedModule,
                AuthRoutingModule
              ],
        })
        component = TestBed.createComponent(LoginComponent).componentInstance;
    });

    it('El LoginComponent se instancia correctamente', () => {
        expect(component).toBeTruthy()
    })

    it('El email y clave deben ser requeridos', () => {
        expect(component.loginForm.get('email')?.hasValidator(Validators.required)).toBeTrue();
        expect(component.loginForm.get('clave')?.hasValidator(Validators.required)).toBeTrue();
    })

    it('Prueba de formulario invalido con campos en touched', () => {
        const spyOnMarkAllAsTouched = spyOn(component.loginForm,'markAllAsTouched');
        component.loginForm.patchValue({
            email: '',
            clave: '',
        });
        expect(component.loginForm.invalid).toBeTrue();
        component.onSubmit();
        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    })
})