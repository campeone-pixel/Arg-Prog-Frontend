import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Skill } from 'src/app/models';

import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent {
  skillForm: FormGroup = new FormGroup({});

  nombreControl = new FormControl('', Validators.required);
  porcentajeControl = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private skillService: SkillService,
    public formBuilder: FormBuilder
  ) {
    this.skillForm = this.formBuilder.group({
      nombre: this.nombreControl,
      porcentaje: this.porcentajeControl,
    });
  }

  add(): void {
    if (this.skillForm.valid) {
      const nuevo: Skill = {
        nombre: this.skillForm.value.nombre,
        porcentaje: this.skillForm.value.porcentaje,
      };

      this.skillService.crearSkill(nuevo).subscribe(() => {});

      this.dialogRef.close();
    } else {
      alert('no es valido');

      this.dialogRef.close();
    }
  }

  onNoClick(event: Event): void {
    this.dialogRef.close();
  }
}
