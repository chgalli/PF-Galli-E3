import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder, private authService: AuthService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    })
  }

  onSubmit(): void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      this.loginForm.get('email')?.setValue('');
      this.loginForm.get('clave')?.setValue('');
    }else{
      const email = this.loginForm.get('email')?.value;
      const clave = this.loginForm.get('clave')?.value;
      this.authService.login(this.loginForm.value);
    }
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
