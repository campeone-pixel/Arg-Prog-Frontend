import { Component } from '@angular/core';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Experiencia } from 'src/app/models';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [],
})
export class EditarComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Experiencia, // Utiliza la interfaz Experiencia
    private experienciaService: ExperienciaService
  ) {
    this.form = this.fb.group({
      puestoEs: new FormControl(this.data.puesto_es, [Validators.required]),
      puestoEn: new FormControl(this.data.puesto_en, [Validators.required]),
      lugar: new FormControl(this.data.lugar, [Validators.required]),
      desde: new FormControl(new Date(this.data.desde), [Validators.required]),
      hasta: new FormControl(new Date(this.data.hasta), [Validators.required]),
      empresa: new FormControl(this.data.empresa, [Validators.required]),
      descripcionEs: new FormControl(this.data.descripcion_es, [Validators.required]),
      descripcionEn: new FormControl(this.data.descripcion_en, [Validators.required]),
    });
  }

  onGuardarClick(): void {
    if (this.form.valid) {
      const editedObject: Experiencia = {
        id:this.data.id,
        puesto_es: this.form.value.puestoEs,
        puesto_en: this.form.value.puestoEn,
        lugar: this.form.value.lugar,
        desde: this.form.value.desde.toISOString(), // Convierte a formato ISO
        hasta: this.form.value.hasta.toISOString(), // Convierte a formato ISO
        empresa: this.form.value.empresa,
        descripcion_es: this.form.value.descripcionEs,
        descripcion_en: this.form.value.descripcionEn,
      };

      this.experienciaService.actualizarExp(editedObject).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      alert('Datos no válidos');
    }
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }
}