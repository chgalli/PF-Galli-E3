import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: 'estudiantes',
        loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'inicio',
        component: HomeComponent,
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path:'cursos',
        loadChildren: () => import('./pages/subjects/subjects.module').then((m) => m.SubjectsModule),
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
