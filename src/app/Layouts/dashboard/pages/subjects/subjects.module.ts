import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';

import { SubjectsComponent } from './subjects.component';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';

import { SubjectsService } from './subjects.service';
import { InscriptionsService } from '../inscriptions/inscriptions.service';

@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectFormComponent
  ],
  imports: [
    SharedModule,
    SubjectsRoutingModule,
    InscriptionsModule
  ],
  providers: [
    SubjectsService,
    InscriptionsService,
  ],
})
export class SubjectsModule { }
