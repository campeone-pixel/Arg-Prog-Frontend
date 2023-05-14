import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { PersonaService } from 'src/app/services/persona.service';

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
    private personaService: PersonaService
  ) {}


  eliminar(){
    this.personaService.eliminarPer(this.data.id).subscribe()
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
