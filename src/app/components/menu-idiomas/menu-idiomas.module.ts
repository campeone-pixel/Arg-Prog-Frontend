import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuIdiomasComponent } from './menu-idiomas.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [MenuIdiomasComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  exports: [MenuIdiomasComponent],
})
export class MenuIdiomasModule {}
