import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AbmAboutMeModule } from './abm/abm-about-me.module';
import { AboutMeComponent } from './about-me.component';

@NgModule({
  declarations: [AboutMeComponent],
  imports: [
    CommonModule,
    AbmAboutMeModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports:[
    AboutMeComponent
  ]
})
export class AboutMeModule { }
