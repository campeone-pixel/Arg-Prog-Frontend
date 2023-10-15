import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona } from 'src/app/models';

import { PersonaService } from 'src/app/services/persona.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  personaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AgregarComponent>,
    private formBuilder: FormBuilder,
    private personaService: PersonaService
  ) {
    this.personaForm = this.formBuilder.group({
      nombres: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nacionalidad_es: new FormControl('', Validators.required),
      nacionalidad_en: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      sobre_mi_es: new FormControl('',Validators.required),
      sobre_mi_en: new FormControl('',Validators.required),
      ocupacion_es: new FormControl('',Validators.required),
      ocupacion_en: new FormControl('',Validators.required),
      image_background_header: new FormControl('',Validators.required),
      image_perfil: new FormControl('',Validators.required),
      image_sobre_mi: new FormControl('',Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.personaForm.valid) {
      const nuevaPersona: Persona = {
        ...this.personaForm.value,
       
      };

      const peticionCrear = this.personaService
        .crearPer(nuevaPersona)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }
}