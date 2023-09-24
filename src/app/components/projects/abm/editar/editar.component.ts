import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Proyecto } from 'src/app/models';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [],
})
export class EditarComponent {
  myForm: FormGroup;

  nombreControl = new FormControl(this.data.nombre_es, [
    Validators.required,
  ]);

  nombreEnControl = new FormControl(this.data.nombre_en, [
    Validators.required,
  ]);

  descripcionControl = new FormControl(this.data.descripcion_es, [
    Validators.required,
  ]);

  descripcionEnControl = new FormControl(this.data.descripcion_en, [
    Validators.required,
  ]);

  linkControl = new FormControl(this.data.link, [Validators.required]);
  linkFotoControl = new FormControl(this.data.link_foto, [Validators.required]);

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proyecto,
    private proyectoService: ProyectoService
  ) {
    this.myForm = this.formBuilder.group({
      nombre_es: this.nombreControl,
      nombre_en: this.nombreEnControl,
      descripcion_es: this.descripcionControl,
      descripcion_en: this.descripcionEnControl,
      link: this.linkControl,
      link_foto: this.linkFotoControl,
    });
  }

  edit(): void {
    if (this.myForm.valid) {
      const newData: Proyecto = {
        id: this.data.id,
        nombre_es: this.myForm.value.nombre_es,
        nombre_en: this.myForm.value.nombre_en,
        descripcion_es: this.myForm.value.descripcion_es,
        descripcion_en: this.myForm.value.descripcion_en,
        link: this.myForm.value.link,
        link_foto: this.myForm.value.link_foto,
      };

      this.proyectoService.actualizarProy(newData).subscribe(() => {});

      this.dialogRef.close();
    } else {
      alert('El formulario no es válido. Por favor, complete todos los campos correctamente.');

      this.dialogRef.close();
    }
  }

  onCancelClick(event: Event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
}