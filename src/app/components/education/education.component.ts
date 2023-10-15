import { Component, OnDestroy, OnInit } from '@angular/core';

import { Educacion, Persona } from 'src/app/models';
import { EducacionService } from 'src/app/services/educacion.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
import { AuthService } from 'src/app/services/auth.service';


import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language-service.service';
import { JsonLoaderService } from 'src/app/services/json-loader.service';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit,OnDestroy {
  educacion: Educacion[] = [];
  isAuthenticated: boolean = false;
  private languageSubscription: Subscription;
  private jsonDataSubscription: Subscription;
  selectedLanguage: string = 'es';
  jsonData: any; // Variable para almacenar los datos JSON

  constructor(
    private datosEducacion: EducacionService,
    public dialog: MatDialog,
    private authService: AuthService,
    
    private languageService: LanguageService,
    private jsonLoaderService: JsonLoaderService
  ) {
    this.datosEducacion.traerEducations().subscribe((data) => {
      this.educacion = data;
    });
    this.languageSubscription = this.languageService.currentLanguage$.subscribe((language) => {
      this.selectedLanguage = language;
      this.jsonLoaderService.loadJsonData(language);
    });

    this.jsonDataSubscription = this.jsonLoaderService.jsonData$.subscribe((jsonData) => {
      // Almacena los datos JSON en la variable jsonData
      this.jsonData = jsonData;
    });
  }

  ngOnInit(): void {
    this.authService.usuarioLogueado.subscribe((dato) => {
      this.isAuthenticated = !!dato;
    });
  
  }


  ngOnDestroy() {
    // Limpiar las suscripciones cuando el componente se destruye
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }

    if (this.jsonDataSubscription) {
      this.jsonDataSubscription.unsubscribe();
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
