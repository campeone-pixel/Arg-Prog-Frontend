import { Component, OnInit } from '@angular/core';

import { PortfolioService } from '../../services/portfolio.service';
import { Proyecto, Skill } from 'src/app/models';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  proyectos: Proyecto[] = [];
  constructor(
    private datosProyecto: ProyectoService,
    public dialog: MatDialog,
    private proyectoService: ProyectoService
  ) {
    this.datosProyecto.traerProyectos().subscribe((data) => {
      this.proyectos = data;
    });
  }

  ngOnInit(): void {}

  agregar(): void {
    const dialog = this.dialog.open(AgregarComponent);
    dialog.afterClosed().subscribe(() => {
      this.proyectoService.traerProyectos().subscribe((data) => {
        this.proyectos = data;
      });
    });
  }

  editar(pro: Proyecto): void {
    const dialog = this.dialog.open(EditarComponent, { data: pro });

    dialog.afterClosed().subscribe(() => {
      this.proyectoService.traerProyectos().subscribe((data) => {
        this.proyectos = data;
      });
    });
  }

  delete(objetoAEliminar: Proyecto): void {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: objetoAEliminar,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.proyectoService.traerProyectos().subscribe((data) => {
        this.proyectos = data;
      });
    });
  }
}
