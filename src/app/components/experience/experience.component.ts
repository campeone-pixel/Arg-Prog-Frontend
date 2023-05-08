import { Component, OnInit } from '@angular/core';

import { Experiences } from 'src/app/models/experiencia.model';
import { AgregarComponent } from './abm/agregar/agregar.component';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experiences: Experiences[] = [];
  constructor(
    private datosExperiencias: ExperienciaService,
    public dialog: MatDialog
  ) {
    this.datosExperiencias.traerExperiencias().subscribe((data) => {
     
      this.experiences = data;
     
    });
  }

  ngOnInit(): void {

  }

  agregarExp(): void {
    const dialog = this.dialog.open(AgregarComponent);
  }
}
