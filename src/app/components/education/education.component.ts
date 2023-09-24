import { Component, OnInit } from '@angular/core';

import { Educacion, Persona } from 'src/app/models';
import { EducacionService } from 'src/app/services/educacion.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
import { AuthService } from 'src/app/services/auth.service';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language-service.service';
registerLocaleData(localeEs);

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  educacion: Educacion[] = [];
  isAuthenticated: boolean = false;
  selectedLanguage: string = 'es';
  private languageSubscription: Subscription;

  constructor(
    private datosEducacion: EducacionService,
    public dialog: MatDialog,
    private authService: AuthService,
    private languageService: LanguageService
  ) {
    this.datosEducacion.traerEducations().subscribe((data) => {
      this.educacion = data;
    });
    this.languageSubscription = this.languageService.currentLanguage$.subscribe((language) => {
      this.selectedLanguage = language;
    });
  }

  ngOnInit(): void {
    this.authService.usuarioLogueado.subscribe((dato) => {
      this.isAuthenticated = !!dato;
    });
  
  }

  ngOnDestroy(): void {
    // Cancela la suscripción al servicio de lenguaje en ngOnDestroy
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  agregar(): void {
    const dialog = this.dialog.open(AgregarComponent);
    dialog.afterClosed().subscribe(() => {
      this.datosEducacion.traerEducations().subscribe((data) => {
        this.educacion = data;
      });
    });
  }

  editar(edu: Educacion): void {
    const dialog = this.dialog.open(EditarComponent, { data: edu });
    dialog.afterClosed().subscribe(() => {
      this.datosEducacion.traerEducations().subscribe((data) => {
        this.educacion = data;
      });
    });
  }

  delete(objetoAEliminar: Educacion): void {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: objetoAEliminar,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.datosEducacion.traerEducations().subscribe((data) => {
        this.educacion = data;
      });
    });
  }
}
