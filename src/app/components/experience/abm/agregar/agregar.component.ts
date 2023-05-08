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

  puestoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  lugarControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  desdeControl = new FormControl('', [Validators.required]);
  hastaControl = new FormControl('', [Validators.required]);
  empresaControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  mejorAlumnoControl = new FormControl(false);

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarComponent>,

    private experienciaService: ExperienciaService
  ) {
    this.registerForm = this.formBuilder.group({
      puesto: this.puestoControl,
      lugar: this.lugarControl,
      desde: this.desdeControl,
      hasta: this.hastaControl,
      empresa: this.empresaControl,
    });
  }

  add(): void {
    if (this.registerForm.valid) {
      const nuevoExp: Experiences = {
        puesto: this.registerForm.value.puesto,
        lugar: this.registerForm.value.lugar,
        desde: this.registerForm.value.desde.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        hasta: this.registerForm.value.hasta.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        empresa: this.registerForm.value.empresa,
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
