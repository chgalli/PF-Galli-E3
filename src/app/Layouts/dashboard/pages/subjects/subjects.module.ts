import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import { SubjectsService } from './subjects.service';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';
import { InscriptionsService } from '../inscriptions/inscriptions.service';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';

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
