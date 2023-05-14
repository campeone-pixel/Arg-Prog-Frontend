import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Experiences, Proyecto } from 'src/app/models';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent {
  myForm: FormGroup = new FormGroup({});

  nombreControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  descripcionControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  linkControl = new FormControl('', [Validators.required]);
  link_fotoControl = new FormControl('', [Validators.required]);

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarComponent>,

    private proyectoService: ProyectoService
  ) {
    this.myForm = this.formBuilder.group({
      nombre: this.nombreControl,
      descripcion: this.descripcionControl,
      link_foto: this.link_fotoControl,
    });
  }

  add(): void {
    if (this.myForm.valid) {
      const newData: Proyecto = {
        nombre: this.myForm.value.nombre,
        descripcion: this.myForm.value.descripcion,
        link: this.myForm.value.link,
        link_foto: this.myForm.value.link_foto,
      };

      this.proyectoService.crearProy(newData).subscribe(() => {});

      this.dialogRef.close();
    } else {
      alert('no es valido');

      this.dialogRef.close();
    }
  }

  onNoClick(event: Event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
}
