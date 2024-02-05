import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module'

import { StudentsComponent } from './students.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsService } from './students.service';
import { InscriptionsService } from '../inscriptions/inscriptions.service';
import { SubjectsService } from '../subjects/subjects.service';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent
  ],
  imports: [
    SharedModule,
    StudentsRoutingModule
  ],
  providers: [
    StudentsService,
    InscriptionsService,
    SubjectsService,
  ]
})
export class StudentsModule { }
