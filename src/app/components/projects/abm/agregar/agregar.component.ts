import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Proyecto } from 'src/app/models';
import { LanguageService } from 'src/app/services/language-service.service';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent {
  myForm: FormGroup;

  nombre_esControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  nombre_enControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  descripcion_esControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  descripcion_enControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  linkControl = new FormControl('', [Validators.required]);
  link_fotoControl = new FormControl('', [Validators.required]);

  idiomaActual: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarComponent>,
    private proyectoService: ProyectoService,
    private languageService: LanguageService
  ) {
    this.idiomaActual = this.languageService.getCurrentLanguage();

    this.myForm = this.formBuilder.group({
      nombre_es: this.nombre_esControl,
      nombre_en: this.nombre_enControl,
      descripcion_es: this.descripcion_esControl,
      descripcion_en: this.descripcion_enControl,
      link: this.linkControl,
      link_foto: this.link_fotoControl,
    });
  }

  add(): void {
    if (this.myForm.valid) {
      const newData: Proyecto = {
        nombre_es: this.myForm.value.nombre_es,
        nombre_en: this.myForm.value.nombre_en,
        descripcion_es: this.myForm.value.descripcion_es,
        descripcion_en: this.myForm.value.descripcion_en,
        link: this.myForm.value.link,
        link_foto: this.myForm.value.link_foto,
      };

      this.proyectoService.crearProy(newData).subscribe(() => {});

      this.dialogRef.close();
    } else {
      alert('No es válido. Asegúrate de que todos los campos estén completos y cumplan con los requisitos.');

      this.dialogRef.close();
    }
  }

  onNoClick(event: Event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
}
