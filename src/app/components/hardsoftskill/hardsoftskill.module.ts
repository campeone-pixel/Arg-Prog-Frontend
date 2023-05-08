import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HardsoftskillComponent } from './hardsoftskill.component';
import { AbmHardSoftSkillModule } from './abm/abm-hardsoftskill.module';

@NgModule({
  declarations: [HardsoftskillComponent],
  imports: [
    CommonModule,
    AbmHardSoftSkillModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports:[
    HardsoftskillComponent
  ]
})
export class HardSoftSkillModule { }
