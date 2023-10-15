import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ExperienciaService } from 'src/app/services/experiencia.service';

import { AuthService } from 'src/app/services/auth.service';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
import { Experiencia } from 'src/app/models/experiencia.model';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language-service.service';
import { JsonLoaderService } from 'src/app/services/json-loader.service';
registerLocaleData(localeEs);

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit,OnDestroy {
  experiences: Experiencia[] = [];
  isAuthenticated: boolean = false;
  private dataUpdateSubscription: Subscription = this.datosExperiencias.dataUpdated.subscribe();
  private languageSubscription: Subscription;
  private jsonDataSubscription: Subscription;
  selectedLanguage: string = 'es';
  jsonData: any; // Variable para almacenar los datos JSON
  constructor(
    private datosExperiencias: ExperienciaService,
    public dialog: MatDialog,
    private authService: AuthService,
    private languageService: LanguageService,
    private jsonLoaderService: JsonLoaderService
  ) {
    this.datosExperiencias
      .traerExperiencias()
      .subscribe((data: Experiencia[]) => {
        this.experiences = data;
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
  ngOnDestroy() {
    // Limpiar las suscripciones cuando el componente se destruye
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }

    if (this.jsonDataSubscription) {
      this.jsonDataSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dataUpdateSubscription = this.datosExperiencias.dataUpdated.subscribe(
      () => {
        this.datosExperiencias.traerExperiencias().subscribe((datos) => {
          this.experiences = datos;
        });
      }
    );

    this.authService.usuarioLogueado.subscribe((dato: any) => {
      this.isAuthenticated = !!dato;
    });
  }

  agregarExp(): void {
    const dialog = this.dialog.open(AgregarComponent);
    dialog.afterClosed().subscribe(() => {
      this.datosExperiencias.traerExperiencias().subscribe((data) => {
        this.experiences = data;
      });
    });
  }

  editarExp(exp: Experiencia): void {
    const dialog = this.dialog.open(EditarComponent, { data: exp });
    dialog.afterClosed().subscribe(() => {
      this.datosExperiencias
        .traerExperiencias()
        .subscribe((data: Experiencia[]) => {
          this.experiences = data;
        });
    });
  }

  openDeleteDialog(objetoAEliminar: Experiencia): void {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: objetoAEliminar,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.datosExperiencias
        .traerExperiencias()
        .subscribe((data: Experiencia[]) => {
          this.experiences = data;
        });
    });
  }


}