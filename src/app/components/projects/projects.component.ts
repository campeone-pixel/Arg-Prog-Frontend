import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  proyectos: Proyecto[] = [];
  isAuthenticated: boolean = false;
  private languageSubscription: Subscription;
  selectedLanguage: string = 'es';

  constructor(
    private datosProyecto: ProyectoService,
    public dialog: MatDialog,
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private languageService: LanguageService // Inyecta tu servicio de idioma aquí
  ) {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe((language) => {
      this.selectedLanguage = language;
    });

    this.datosProyecto.traerProyectos().subscribe((data) => {
      this.proyectos = data;
    });
  }

  ngOnInit(): void {
    this.datosProyecto.dataUpdated.subscribe(() => {
      this.datosProyecto.traerProyectos().subscribe((datos) => {
        this.proyectos = datos;
      });
    });

    this.authService.usuarioLogueado.subscribe((dato) => {
      this.isAuthenticated = !!dato;
    });
  }

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
