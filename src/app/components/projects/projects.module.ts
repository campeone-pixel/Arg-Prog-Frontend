import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './projects.component';
import { AbmProjectsModule } from './abm/abm-projects.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    AbmProjectsModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports:[
    ProjectsComponent
  ]
})
export class ProjectsModule { }
