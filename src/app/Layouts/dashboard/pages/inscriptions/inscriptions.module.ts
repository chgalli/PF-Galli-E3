import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module'

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsService } from './inscriptions.service';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';

import { SubjectsService } from '../subjects/subjects.service';
import { StudentsService } from '../students/students.service';

@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionFormComponent
  ],
  imports: [
    SharedModule,
    InscriptionsRoutingModule,
  ],
  providers: [
    InscriptionsService,
    SubjectsService,
    StudentsService,
  ],
})
export class InscriptionsModule { }
