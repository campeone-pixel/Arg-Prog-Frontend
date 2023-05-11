import { Component,Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
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

  escuelaControl = new FormControl('', Validators.required)
  tituloControl =  new FormControl('', Validators.required)
  imagenControl = new FormControl('', Validators.required)
  carreraControl = new FormControl('', Validators.required)
  inicioControl =  new FormControl('', Validators.required)
  finControl = new FormControl('', Validators.required)




  constructor(
    public dialogRef: MatDialogRef<AgregarComponent>,
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
        escuela: this.educationForm.value.escuela,
        titulo: this.educationForm.value.titulo,
        imagen: this.educationForm.value.imagen,
        carrera: this.educationForm.value.carrera,
        inicio: this.educationForm.value.inicio.toDateString(),
        fin: this.educationForm.value.fin.toDateString()
      };

      this.educacionService.crearEdu(nuevo).subscribe(() => {
       
  
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
