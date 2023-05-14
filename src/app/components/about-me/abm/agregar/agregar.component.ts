import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona } from 'src/app/models';

import { PersonaService } from 'src/app/services/persona.service';
import { EditarComponent } from '../editar/editar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent {
  personaForm: FormGroup;
  nombresControl = new FormControl('', Validators.required);
  apellidoControl = new FormControl('', Validators.required);
  nacionalidadControl = new FormControl('', Validators.required);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  sobreMiControl = new FormControl('');
  ocupacionControl = new FormControl('');
  imagenFondoEncabezadoControl = new FormControl('');
  imagenPerfilControl = new FormControl('');
  image_sobre_miControl = new FormControl('');
  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    private formBuilder: FormBuilder,

    private personaService: PersonaService
  ) {
    this.personaForm = this.formBuilder.group({
      nombres: this.nombresControl,
      apellido: this.apellidoControl,
      nacionalidad: this.nacionalidadControl,
      email: this.emailControl,
      sobre_mi: this.sobreMiControl,
      ocupacion: this.ocupacionControl,
      image_background_header: this.imagenFondoEncabezadoControl,
      image_perfil: this.imagenPerfilControl,
      image_sobre_mi: this.image_sobre_miControl,
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.personaForm.valid) {
      const nueva = {
        nombres: this.personaForm.value.nombres,
        apellido: this.personaForm.value.apellido,
        nacionalidad: this.personaForm.value.nacionalidad,
        email: this.personaForm.value.email,
        sobre_mi: this.personaForm.value.sobre_mi,
        ocupacion: this.personaForm.value.ocupacion,
        image_background_header: this.personaForm.value.image_background_header,
        image_perfil: this.personaForm.value.image_perfil,
        image_sobre_mi:this.personaForm.value.image_sobre_mi
      };

      console.log(nueva)

      this.personaService.crearPer(nueva).subscribe();
      this.dialogRef.close();
    } else {
    }
  }
}
