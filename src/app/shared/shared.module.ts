import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

import { FullNamePipe } from '../shared/pipes/fullname.pipe';
import { TitleSizeDirective } from '../shared/directives/TitleSize.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    TitleSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,

    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTabsModule,
    MatGridListModule,
    MatNativeDateModule,
    MatListModule,
    MatDatepickerModule,
    MatDialogModule,

    FormsModule,
    ReactiveFormsModule,

    FullNamePipe,
    TitleSizeDirective,
  ]
})
export class SharedModule { }
