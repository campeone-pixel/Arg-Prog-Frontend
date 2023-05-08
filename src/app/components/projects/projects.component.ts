import { Component, OnInit } from '@angular/core';


import { PortfolioService } from '../../services/portfolio.service';
import { Proyecto } from 'src/app/models';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  proyectos: Proyecto[] = [];
  constructor(
    private datosProyecto: ProyectoService,
    public dialog: MatDialog
  ) {
    this.datosProyecto.traerProyectos().subscribe((data) => {
     
      this.proyectos = data;
    
    });
  }

  ngOnInit(): void {

  }

  agregarExp(): void {
    const dialog = this.dialog.open(AgregarComponent);
  }
}
