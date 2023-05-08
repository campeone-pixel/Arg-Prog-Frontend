import { Component } from '@angular/core';

import { Educacion } from 'src/app/models';
import { EducacionService } from 'src/app/services/educacion.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
 educacion:Educacion[] = [];
  constructor(
    private datosEducacion: EducacionService,
    public dialog: MatDialog
  ) {
    this.datosEducacion.traerEducations().subscribe((data) => {
     
      this.educacion = data;
     
    });
  }

  ngOnInit(): void {
    
  }

  agregarExp(): void {
    const dialog = this.dialog.open(AgregarComponent);
  }

}
