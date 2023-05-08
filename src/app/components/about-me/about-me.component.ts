import { Component } from '@angular/core';

import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
  persona: Persona | null = null
  constructor(
    private datosPersona: PersonaService,
    public dialog: MatDialog
  ) {
    this.datosPersona.traerPersonas().subscribe((data) => {
     
      this.persona = data[0];
     
    });
  }

  ngOnInit(): void {
   
  }

  agregarExp(): void {
    const dialog = this.dialog.open(AgregarComponent);
  }

}
