import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { EducationComponent } from './education.component';
import { AbmEducationModule } from './abm/abm-education.module';

@NgModule({
  declarations: [EducationComponent],
  imports: [
    CommonModule,
    AbmEducationModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports:[EducationComponent]
  
})
export class EducationModule { }
