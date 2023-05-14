import { Component } from '@angular/core';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Experiences, Persona } from 'src/app/models';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [],
})
export class EditarComponent {
  personaForm: FormGroup;
  nombresControl = new FormControl(this.data.nombres, Validators.required);
  apellidoControl = new FormControl(this.data.apellido, Validators.required);
  nacionalidadControl = new FormControl(
    this.data.nacionalidad,
    Validators.required
  );
  emailControl = new FormControl(this.data.email, [
    Validators.required,
    Validators.email,
  ]);
  sobreMiControl = new FormControl(this.data.sobre_mi);
  ocupacionControl = new FormControl(this.data.ocupacion);
  imagenFondoEncabezadoControl = new FormControl(
    this.data.image_background_header
  );
  imagenPerfilControl = new FormControl(this.data.image_perfil);
  image_sobre_miControl = new FormControl(this.data.image_sobre_mi);
  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Persona,
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
      const updatedPersona = {
        id: this.data.id,
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
   
      this.personaService.actualizarPer(updatedPersona).subscribe();
     
      this.dialogRef.close(updatedPersona);
    } else {
    }
  }
}
