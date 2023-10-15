import { Component, OnDestroy, OnInit } from '@angular/core';

import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona.service';
import { MatDialog } from '@angular/material/dialog';

import { EditarComponent } from './abm/editar/editar.component';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language-service.service';
import { JsonLoaderService } from 'src/app/services/json-loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit,OnDestroy {
  persona?: Persona | null;
  isAuthenticated: boolean = false;
  private languageSubscription: Subscription;
  private jsonDataSubscription: Subscription;
  currentLanguage: string = 'es';
  selectedLanguage: string = 'es';
  jsonData: any; // Variable para almacenar los datos JSON

  constructor(
    private datosPersona: PersonaService,
    public dialog: MatDialog,
    private authService: AuthService,
    private languageService: LanguageService,
    private jsonLoaderService: JsonLoaderService
  ) {
    this.datosPersona.traerPersonas().subscribe((data) => {
      this.persona = data[0];
    });
    this.languageSubscription = this.languageService.currentLanguage$.subscribe((language) => {
      this.selectedLanguage = language;
      this.jsonLoaderService.loadJsonData(language);
    });

    this.jsonDataSubscription = this.jsonLoaderService.jsonData$.subscribe((jsonData) => {
      // Almacena los datos JSON en la variable jsonData
      this.jsonData = jsonData;
    });
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngOnInit(): void {
    this.datosPersona.dataUpdated.subscribe(() => {
      this.datosPersona.traerPersonas().subscribe((datos) => {
        this.persona = datos[0];
      });
    });

    this.authService.usuarioLogueado.subscribe((dato) => {
      this.isAuthenticated = !!dato;
    });

    
  }

  agregar(): void {
    const dialog = this.dialog.open(AgregarComponent);
    dialog.afterClosed().subscribe(() => {
      this.datosPersona.traerPersonas().subscribe((data) => {
        this.persona = data[0];
      });
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

  editar(): void {
    const data = { ...this.persona };
    const dialog = this.dialog.open(EditarComponent, { data: data });

    dialog.afterClosed().subscribe(() => {
      this.datosPersona.traerPersonas().subscribe((data) => {
        this.persona = data[0];
      });
    });
  }

  delete(objetoAEliminar: Persona | null | undefined): void {
    console.log(objetoAEliminar);
    const dialog = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: objetoAEliminar,
    });

    dialog.afterClosed().subscribe(() => {
      this.datosPersona.traerPersonas().subscribe((data) => {
        this.persona = data[0];
      });
    });
  }
}
