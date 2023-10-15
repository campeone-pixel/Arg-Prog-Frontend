import { Component, OnInit, OnDestroy } from '@angular/core';
import { Proyecto } from 'src/app/models';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language-service.service';
import { JsonLoaderService } from 'src/app/services/json-loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  proyectos: Proyecto[] = [];
  isAuthenticated: boolean = false;
  private languageSubscription: Subscription;
  private jsonDataSubscription: Subscription;
  selectedLanguage: string = 'es';
  jsonData: any; // Variable para almacenar los datos JSON

  constructor(
    private datosProyecto: ProyectoService,
    public dialog: MatDialog,
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private languageService: LanguageService,
    private jsonLoaderService: JsonLoaderService
  ) {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe((language) => {
      this.selectedLanguage = language;
      this.jsonLoaderService.loadJsonData(language);
    });

    this.jsonDataSubscription = this.jsonLoaderService.jsonData$.subscribe((jsonData) => {
      // Almacena los datos JSON en la variable jsonData
      this.jsonData = jsonData;
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

  ngOnDestroy() {
    // Limpiar las suscripciones cuando el componente se destruye
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }

    if (this.jsonDataSubscription) {
      this.jsonDataSubscription.unsubscribe();
    }
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