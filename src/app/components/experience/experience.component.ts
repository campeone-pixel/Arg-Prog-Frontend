import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ExperienciaService } from 'src/app/services/experiencia.service';

import { AuthService } from 'src/app/services/auth.service';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
import { Experiences } from 'src/app/models/experiencia.model';
import { Subscription } from 'rxjs';
registerLocaleData(localeEs);

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experiences: Experiences[] = [];
  isAuthenticated: boolean = false;
  private dataUpdateSubscription: Subscription = this.datosExperiencias.dataUpdated.subscribe();

  constructor(
    private datosExperiencias: ExperienciaService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.datosExperiencias
      .traerExperiencias()
      .subscribe((data: Experiences[]) => {
        this.experiences = data;
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

  editarExp(exp: Experiences): void {
    const dialog = this.dialog.open(EditarComponent, { data: exp });
    dialog.afterClosed().subscribe(() => {
      this.datosExperiencias
        .traerExperiencias()
        .subscribe((data: Experiences[]) => {
          this.experiences = data;
        });
    });
  }

  openDeleteDialog(objetoAEliminar: Experiences): void {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: objetoAEliminar,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.datosExperiencias
        .traerExperiencias()
        .subscribe((data: Experiences[]) => {
          this.experiences = data;
        });
    });
  }
}
