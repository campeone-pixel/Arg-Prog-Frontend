import { Component } from '@angular/core';

import { Educacion, Persona } from 'src/app/models';
import { EducacionService } from 'src/app/services/educacion.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
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
  agregar(): void {
    const dialog = this.dialog.open(AgregarComponent);
    dialog.afterClosed().subscribe(() => {
      this.datosEducacion.traerEducations().subscribe((data) => {
        this.educacion = data;
      });
    });
  }

  editar(edu: Educacion): void {
  
    const dialog = this.dialog.open(EditarComponent, { data: edu });

    dialog.afterClosed().subscribe(() => {
      this.datosEducacion.traerEducations().subscribe((data) => {
        this.educacion = data;
      });
    });
  }

  delete(objetoAEliminar: Educacion): void {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: objetoAEliminar,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.datosEducacion.traerEducations().subscribe((data) => {
        this.educacion = data;
      });
    });
  }

}
