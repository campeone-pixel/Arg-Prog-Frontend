import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';

import { MatDialogModule } from '@angular/material/dialog';
import { DialogosModule } from './dialogos/dialogos.module';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  declarations: [AuthComponent,],
  imports: [
    CommonModule,
    MatDialogModule,
    DialogosModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports:[AuthComponent]
})
export class AuthModule { }
