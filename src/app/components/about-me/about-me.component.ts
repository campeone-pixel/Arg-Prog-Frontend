import { Component, OnInit } from '@angular/core';

import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona.service';
import { MatDialog } from '@angular/material/dialog';

import { EditarComponent } from './abm/editar/editar.component';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
  persona?: Persona | null;

  isAuthenticated: boolean = false;

  constructor(
    private datosPersona: PersonaService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.datosPersona.traerPersonas().subscribe((data) => {
      this.persona = data;
    });
  }

  ngOnInit(): void {
    this.datosPersona.dataUpdated.subscribe(() => {
      this.datosPersona.traerPersonas().subscribe((datos) => {
        this.persona = datos;
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
        this.persona = data;
      });
    });
  }

  editar(): void {
    const data = { ...this.persona };
    const dialog = this.dialog.open(EditarComponent, { data: data });

    dialog.afterClosed().subscribe(() => {
      this.datosPersona.traerPersonas().subscribe((data) => {
        this.persona = data;
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
        this.persona = data;
      });
    });
  }
}
