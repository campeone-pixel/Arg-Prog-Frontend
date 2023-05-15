import { Component } from '@angular/core';

import {  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Educacion, Experiences } from 'src/app/models';
import { EducacionService } from 'src/app/services/educacion.service';




@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [
  ]
})
export class EditarComponent {
  educationForm: FormGroup = new FormGroup({});

  escuelaControl = new FormControl(this.data.escuela, Validators.required)
  tituloControl =  new FormControl(this.data.titulo, Validators.required)
  imagenControl = new FormControl(this.data.imagen, Validators.required)
  carreraControl = new FormControl(this.data.carrera, Validators.required)
  inicioControl =  new FormControl(new Date(this.data.inicio), Validators.required)
  finControl = new FormControl(new Date(this.data.fin), Validators.required)




  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Educacion,
    private educacionService: EducacionService,public formBuilder: FormBuilder,
  ) { 

    this.educationForm = this.formBuilder.group({
      escuela: this.escuelaControl,
      titulo: this.tituloControl,
      imagen: this.imagenControl,
      carrera: this.carreraControl,
      inicio: this.inicioControl,
      fin: this.finControl
    });
  }

  onSubmit() {
   if (this.educationForm.valid) {
    console.log(this.educationForm)
      const nuevo: Educacion = {
        id: this.data.id,
        escuela: this.educationForm.value.escuela,
        titulo: this.educationForm.value.titulo,
        imagen: this.educationForm.value.imagen,
        carrera: this.educationForm.value.carrera,
        inicio: this.educationForm.value.inicio.toDateString(),
        fin: this.educationForm.value.fin.toDateString()
      };

      this.educacionService.actualizarEdu(nuevo).subscribe(() => {
       
  
      });

      this.dialogRef.close();
    } else {
      alert('no es valido');

      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
