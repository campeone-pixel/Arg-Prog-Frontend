import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Experiencia } from 'src/app/models/experiencia.model';

import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent {
  registerForm: FormGroup; // No se necesita pasar argumentos a FormGroup

  // Define los controles para cada campo
  puestoEsControl = new FormControl('', [Validators.required]);
  puestoEnControl = new FormControl('', [Validators.required]);
  lugarControl = new FormControl('', [Validators.required]);
  desdeControl = new FormControl('', [Validators.required]);
  hastaControl = new FormControl('', [Validators.required]);
  empresaControl = new FormControl('', [Validators.required]);
  descripcionEsControl = new FormControl('', [Validators.required]);
  descripcionEnControl = new FormControl('', [Validators.required]);

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Experiencia, // Utiliza la interfaz Experiencia
    private experienciaService: ExperienciaService
  ) {
    // Utiliza formBuilder.group() para crear el formulario
    this.registerForm = this.formBuilder.group({
      puestoEs: this.puestoEsControl,
      puestoEn: this.puestoEnControl,
      lugar: this.lugarControl,
      desde: this.desdeControl,
      hasta: this.hastaControl,
      empresa: this.empresaControl,
      descripcionEs: this.descripcionEsControl,
      descripcionEn: this.descripcionEnControl,
    });
  }

  add(): void {
    if (this.registerForm.valid) {
      const nuevaExperiencia: Experiencia = {
        
        puesto_es: this.registerForm.value.puestoEs,
        puesto_en: this.registerForm.value.puestoEn,
        lugar: this.registerForm.value.lugar,
        desde: this.registerForm.value.desde,
        hasta: this.registerForm.value.hasta,
        empresa: this.registerForm.value.empresa,
        descripcion_es: this.registerForm.value.descripcionEs,
        descripcion_en: this.registerForm.value.descripcionEn,
      };

      this.experienciaService.crearExp(nuevaExperiencia).subscribe(() => {
        // Realiza acciones adicionales después de crear la experiencia
        // Por ejemplo, cerrar el diálogo
        this.dialogRef.close();
      });
    } else {
      alert('Los datos no son válidos.');
    }
  }

  onNoClick(event: Event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
}
