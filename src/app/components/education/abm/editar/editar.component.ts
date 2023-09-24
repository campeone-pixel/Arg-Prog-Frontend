import { Component } from '@angular/core';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Educacion } from 'src/app/models';
import { EducacionService } from 'src/app/services/educacion.service';
import { LanguageService } from 'src/app/services/language-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [],
})
export class EditarComponent {
  educationForm: FormGroup = new FormGroup({});
  private languageSubscription: Subscription;
  currentLanguage: string = 'es';
  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Educacion,
    private educacionService: EducacionService,
    public formBuilder: FormBuilder,
    private languageService: LanguageService
  ) {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
    this.educationForm = this.formBuilder.group({
      id: [this.data.id],
      escuela: [this.data.escuela, Validators.required],
      titulo_es: [this.data.titulo_es, Validators.required],
      titulo_en: [this.data.titulo_en, Validators.required],
      imagen: [this.data.imagen, Validators.required],
      carrera_es: [this.data.carrera_es, Validators.required],
      carrera_en: [this.data.carrera_en, Validators.required],
      inicio: [this.data.inicio, Validators.required],
      fin: [this.data.fin, Validators.required],
    });
  }

  
  ngOnDestroy(): void {
    // Cancela la suscripción al servicio de lenguaje en ngOnDestroy
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.educationForm.valid) {
      const nuevo: Educacion = this.educationForm.value;

      this.educacionService.actualizarEdu(nuevo).subscribe(() => {
        // Realiza alguna acción después de actualizar la educación, si es necesario
      });

      this.dialogRef.close();
    } else {
      alert('El formulario no es válido.');
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}