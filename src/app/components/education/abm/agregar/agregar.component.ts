import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Educacion } from 'src/app/models';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent {
  educationForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Educacion,
    private educacionService: EducacionService,
    public formBuilder: FormBuilder
  ) {
    this.educationForm = this.formBuilder.group({
      escuela: new FormControl('', Validators.required),
      titulo_es: new FormControl('', Validators.required),
      titulo_en: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
      carrera_es: new FormControl('', Validators.required),
      carrera_en: new FormControl('', Validators.required),
      inicio: new FormControl('', Validators.required),
      fin: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.educationForm.valid) {
      console.log(this.educationForm);
      const nuevo: Educacion = {
        id: 0, // No necesitas especificar un ID para crear un nuevo registro
        escuela: this.educationForm.value.escuela,
        titulo_es: this.educationForm.value.titulo_es,
        titulo_en: this.educationForm.value.titulo_en,
        imagen: this.educationForm.value.imagen,
        carrera_es: this.educationForm.value.carrera_es,
        carrera_en: this.educationForm.value.carrera_en,
        inicio: this.educationForm.value.inicio,
        fin: this.educationForm.value.fin,
      };

      this.educacionService.crearEdu(nuevo).subscribe(() => {
        // Lógica después de la creación exitosa, si es necesario
        // Puedes cerrar el diálogo aquí o realizar otras acciones.
      });

      this.dialogRef.close();
    } else {
      alert('No es válido');

      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}