import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
        {
          path: 'estudiantes',
          loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
          data: { title: 'Lista usuarios' },
        },
        {
          path: 'inicio',
          loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
          data: { title: 'Inicio' },
        },
        {
          path:'cursos',
          loadChildren: () => import('./pages/subjects/subjects.module').then((m) => m.SubjectsModule),
          data: { title: 'Lista cursos' },
        },
        {
          path: 'inscripciones',
          loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
          data: { title: 'Lista inscripciones' },
        },
        { 
            path: "",
            redirectTo: "inicio", pathMatch: "prefix" 
        },
]
@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [RouterModule,]
})

export class DashboardRoutingModule {}