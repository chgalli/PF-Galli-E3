import { NgModule } from '@angular/core';

import { SharedModule } from '../../../app/shared/shared.module';

import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
})
export class AuthModule { }
