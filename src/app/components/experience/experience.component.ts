import { Component, OnInit } from '@angular/core';

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
registerLocaleData(localeEs);

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experiences: Experiencia[] = [];
  isAuthenticated: boolean = false;
  private dataUpdateSubscription: Subscription = this.datosExperiencias.dataUpdated.subscribe();
  private languageSubscription: Subscription;
  selectedLanguage: string = 'es';

  constructor(
    private datosExperiencias: ExperienciaService,
    public dialog: MatDialog,
    private authService: AuthService,
    private languageService: LanguageService // Inyecta el servicio de LanguageService
  ) {
    this.datosExperiencias
      .traerExperiencias()
      .subscribe((data: Experiencia[]) => {
        this.experiences = data;
      });

      this.languageSubscription = this.languageService.currentLanguage$.subscribe((language) => {
        this.selectedLanguage = language;
      });
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