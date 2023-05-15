import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Skill } from 'src/app/models';
import { Experiences } from 'src/app/models/experiencia.model';

import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent {
  registerForm: FormGroup = new FormGroup({});

  puestoControl = new FormControl('', [Validators.required]);
  lugarControl = new FormControl('', [Validators.required]);
  desdeControl = new FormControl('', [Validators.required]);
  hastaControl = new FormControl('', [Validators.required]);
  empresaControl = new FormControl('', [Validators.required]);
  descripcionControl = new FormControl('', [Validators.required]);

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Experiences,
    private experienciaService: ExperienciaService
  ) {
    this.registerForm = this.formBuilder.group({
      puesto: this.puestoControl,
      lugar: this.lugarControl,
      desde: this.desdeControl,
      hasta: this.hastaControl,
      empresa: this.empresaControl,
      descripcion: this.descripcionControl,
    });

    console.log(this.registerForm);
  }

  add(): void {
    if (this.registerForm.valid) {
      const nuevoExp: Experiences = {
        puesto: this.registerForm.value.puesto,
        lugar: this.registerForm.value.lugar,
        desde: this.registerForm.value.desde.toDateString(),
        hasta: this.registerForm.value.hasta.toDateString(),
        empresa: this.registerForm.value.empresa,
        descripcion: this.registerForm.value.descripcion,
      };
      console.log(nuevoExp);

      this.experienciaService.crearExp(nuevoExp).subscribe(() => {});

      this.dialogRef.close();
    } else {
      alert('no es valido');
      console.log(this.registerForm);
      this.dialogRef.close();
    }
  }

  onNoClick(event: Event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
}
