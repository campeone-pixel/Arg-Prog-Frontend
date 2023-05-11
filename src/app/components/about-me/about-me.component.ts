import { Component } from '@angular/core';

import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona.service';
import { MatDialog } from '@angular/material/dialog';

import { EditarComponent } from './abm/editar/editar.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
  persona?: Persona;
  constructor(private datosPersona: PersonaService, public dialog: MatDialog) {
    this.datosPersona.traerPersonas().subscribe((data) => {
      this.persona = data[0];
    });
  }

  ngOnInit(): void {}

  // agregar(): void {
  //   const dialog = this.dialog.open(AgregarComponent);
  //   dialog.afterClosed().subscribe(() => {
  //     this.datosPersona.traerPersonas().subscribe((data) => {
  //       this.persona = data[0];
  //     });
  //   });
  // }

  editar(): void {
    const data = { ...this.persona };
    const dialog = this.dialog.open(EditarComponent, { data: data });

    dialog.afterClosed().subscribe(() => {
      this.datosPersona.traerPersonas().subscribe((data) => {
        this.persona = data[0];
      });
    });
  }

  // delete(objetoAEliminar: Persona): void {
  //   const dialogRef = this.dialog.open(EliminarComponent, {
  //     width: '250px',
  //     data: objetoAEliminar,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.datosPersona.traerPersonas().subscribe((data) => {
  //       this.persona = data[0];
  //     });
  //   });
  // }
}
