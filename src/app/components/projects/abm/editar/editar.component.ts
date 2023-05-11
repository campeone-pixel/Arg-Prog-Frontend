import { Component } from '@angular/core';

import {  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {  Proyecto } from 'src/app/models';

import { ProyectoService } from 'src/app/services/proyecto.service';
import { AgregarComponent } from '../agregar/agregar.component';



@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [
  ]
})
export class EditarComponent {
  myForm: FormGroup = new FormGroup({});

  nombreControl = new FormControl(this.data.nombre, [
    Validators.required,
    Validators.minLength(5),
  ]);

  descripcionControl = new FormControl(this.data.descripcion, [
    Validators.required,
    Validators.minLength(5),
  ]);
  linkControl = new FormControl(this.data.link, [Validators.required]);

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proyecto,
    private proyectoService: ProyectoService
  ) {
    this.myForm = this.formBuilder.group({
      nombre: this.nombreControl,
      descripcion: this.descripcionControl,
      link: this.linkControl,
    });
  }

  add(): void {
    if (this.myForm.valid) {
      const newData: Proyecto = {
        nombre: this.myForm.value.nombre,
        descripcion: this.myForm.value.descripcion,
        link: this.myForm.value.link,
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
