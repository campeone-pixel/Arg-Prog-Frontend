import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Persona } from 'src/app/models/persona.model'; // Asegúrate de importar la interfaz Persona correcta
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [],
})
export class EditarComponent {
  personaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Persona,
    private personaService: PersonaService
  ) {
    this.personaForm = this.formBuilder.group({
      nombres: new FormControl(this.data.nombres, Validators.required),
      apellido: new FormControl(this.data.apellido, Validators.required),
      nacionalidad_es: new FormControl(this.data.nacionalidad_es, Validators.required),
      nacionalidad_en: new FormControl(this.data.nacionalidad_en, Validators.required),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      sobre_mi_es: new FormControl(this.data.sobre_mi_es),
      sobre_mi_en: new FormControl(this.data.sobre_mi_en),
      ocupacion_es: new FormControl(this.data.ocupacion_es),
      ocupacion_en: new FormControl(this.data.ocupacion_en),
      image_background_header: new FormControl(this.data.image_background_header),
      image_perfil: new FormControl(this.data.image_perfil),
      image_sobre_mi: new FormControl(this.data.image_sobre_mi),
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.personaForm.valid) {
      const updatedPersona: Persona = {
        ...this.data,
        nombres: this.personaForm.value.nombres,
        apellido: this.personaForm.value.apellido,
        nacionalidad_es: this.personaForm.value.nacionalidad_es,
        nacionalidad_en: this.personaForm.value.nacionalidad_en,
        email: this.personaForm.value.email,
        sobre_mi_es: this.personaForm.value.sobre_mi_es,
        sobre_mi_en: this.personaForm.value.sobre_mi_en,
        ocupacion_es: this.personaForm.value.ocupacion_es,
        ocupacion_en: this.personaForm.value.ocupacion_en,
        image_background_header: this.personaForm.value.image_background_header,
        image_perfil: this.personaForm.value.image_perfil,
        image_sobre_mi: this.personaForm.value.image_sobre_mi,
      };

      this.personaService.actualizarPer(updatedPersona).subscribe(() => {
        this.dialogRef.close(updatedPersona);
      });
    }
  }
}
