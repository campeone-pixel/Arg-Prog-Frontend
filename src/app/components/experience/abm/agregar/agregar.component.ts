import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Experiences } from 'src/app/models';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent {
  registerForm: FormGroup = new FormGroup({});

  PuestoControl = new FormControl('', [Validators.required]);

  lugarControl = new FormControl('', [Validators.required]);
  desdeControl = new FormControl('', [Validators.required]);
  hastaControl = new FormControl('', [Validators.required]);
  empresaControl = new FormControl('', [Validators.required]);

  descripcionControl = new FormControl('', [Validators.required]);

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarComponent>,

    private experienciaService: ExperienciaService
  ) {
    this.registerForm = this.formBuilder.group({
      Puesto: this.PuestoControl,
      lugar: this.lugarControl,
      desde: this.desdeControl,
      hasta: this.hastaControl,
      empresa: this.empresaControl,
      descripcion: this.descripcionControl,
    });
  }

  add(): void {
    if (this.registerForm.valid) {
      const nuevoExp: Experiences = {
        Puesto: this.registerForm.value.Puesto,
        lugar: this.registerForm.value.lugar,
        desde: this.registerForm.value.desde.toDateString(),
        hasta: this.registerForm.value.hasta.toDateString(),
        empresa: this.registerForm.value.empresa,
        descripcion: this.registerForm.value.descripcion,
      };

      this.experienciaService.crearExp(nuevoExp).subscribe((response) => {
        console.log(response);
      });

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
