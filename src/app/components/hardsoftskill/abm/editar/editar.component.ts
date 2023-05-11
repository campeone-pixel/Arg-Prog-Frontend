import { Component } from '@angular/core';

import {  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Experiences, Skill } from 'src/app/models';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { SkillService } from 'src/app/services/skill.service';
import { AgregarComponent } from '../agregar/agregar.component';



@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [
  ]
})
export class EditarComponent {
  skillForm: FormGroup = new FormGroup({});

  nombreControl =  new FormControl(this.data.nombre, Validators.required)
  porcentajeControl = new FormControl(this.data.porcentaje, Validators.required)





  constructor(
    public dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private skillService: SkillService,public formBuilder: FormBuilder,
  ) { 

    this.skillForm = this.formBuilder.group({
      nombre: this.nombreControl,
      porcentaje: this.porcentajeControl,


    });
  }

  editar(): void {
    if (this.skillForm.valid) {
      const nuevo: Skill = {
        nombre: this.skillForm.value.nombre,
        porcentaje: this.skillForm.value.porcentaje
      };

      this.skillService.actualizarSkill(nuevo).subscribe(() => {
       
      });

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
