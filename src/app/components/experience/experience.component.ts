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

registerLocaleData(localeEs);
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experiences: Experiences[] = [];
  isAuthenticated: boolean = false;
  
  constructor(
    private datosExperiencias: ExperienciaService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.datosExperiencias.traerExperiencias().subscribe((data) => {
      this.experiences = data;
   
      
    });

    this.authService.usuarioLogueado.subscribe((dato) => {
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
    const data = { ...exp };

    const dialog = this.dialog.open(EditarComponent, { data: data });

    dialog.afterClosed().subscribe(() => {
      this.datosExperiencias.traerExperiencias().subscribe((data) => {
        this.experiences = data;
      });
    });
  }

  openDeleteDialog(objetoAEliminar: Experiences): void {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: objetoAEliminar,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.datosExperiencias.traerExperiencias().subscribe((data) => {
        this.experiences = data;
      });
    });
  }
}
