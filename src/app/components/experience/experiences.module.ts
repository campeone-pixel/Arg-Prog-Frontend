import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbmExperiencesModule } from './abm/abm-experiences.module';
import { ExperienceComponent } from './experience.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ExperienceComponent],
  imports: [
    CommonModule,
    AbmExperiencesModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports:[
    ExperienceComponent
  ]
})
export class ExperiencesModule { }
