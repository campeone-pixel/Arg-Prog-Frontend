import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperienciaService } from 'src/app/services/experiencia.service';

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
    private datosExperiencias: ExperienciaService
  ) {}


  eliminar(){
    this.datosExperiencias.eliminarExp(this.data.id).subscribe()
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
