import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SkillService } from 'src/app/services/skill.service';

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
    private skillService: SkillService
  ) {}


  eliminar(){
    this.skillService.eliminarSkill(this.data.id).subscribe()
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
