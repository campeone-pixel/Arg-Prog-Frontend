import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { AbmEducationModule } from './abm/abm-education.module';



@NgModule({
  declarations: [EducationComponent],
  imports: [
    CommonModule,
  AbmEducationModule,
  ],exports:[
    EducationComponent
  ]
})
export class EducationModule { }
