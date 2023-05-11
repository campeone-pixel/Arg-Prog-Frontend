import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styles: [
  ]
})
export class EliminarComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private proyectoService: ProyectoService
  ) {}


  eliminar(){
    this.proyectoService.eliminarProy(this.data.id).subscribe()
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
