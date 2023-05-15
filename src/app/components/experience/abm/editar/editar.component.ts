import { Component } from '@angular/core';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Experiences } from 'src/app/models';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [],
})
export class EditarComponent {
  form: FormGroup;

  registerForm: FormGroup = new FormGroup({});

  puestoControl = new FormControl(this.data.puesto, [Validators.required]);

  lugarControl = new FormControl(this.data.lugar, [Validators.required]);
  desdeControl = new FormControl(new Date(this.data.desde), [
    Validators.required,
  ]);
  hastaControl = new FormControl(new Date(this.data.hasta), [
    Validators.required,
  ]);
  empresaControl = new FormControl(this.data.empresa, [Validators.required]);
  descripcionControl = new FormControl(this.data.descripcion, [
    Validators.required,
  ]);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Experiences,
    private experienciaService: ExperienciaService
  ) {
    console.log(this.data.puesto);

    this.form = this.fb.group({
      puesto: this.puestoControl,
      lugar: this.lugarControl,
      desde: this.desdeControl,
      hasta: this.hastaControl,
      empresa: this.empresaControl,
      descripcion: this.descripcionControl,
    });
  }

  onGuardarClick(): void {
    if (this.form.valid) {
      const editedObject = {
        id: this.data.id,
        puesto: this.form.value.puesto,
        lugar: this.form.value.lugar,
        desde: this.form.value.desde.toLocaleDateString(),
        hasta: this.form.value.hasta.toLocaleDateString(),
        empresa: this.form.value.empresa,
        descripcion: this.form.value.descripcion,
      };
      

      this.experienciaService.actualizarExp(editedObject).subscribe(() => {});
      this.dialogRef.close();
    } else {
      alert('no valido');
      this.dialogRef.close();
    }
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }
}
