import { Component, OnInit, OnDestroy } from '@angular/core';
import { Skill } from 'src/app/models';
import { SkillService } from 'src/app/services/skill.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language-service.service';
import { JsonLoaderService } from 'src/app/services/json-loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hardsoftskill',
  templateUrl: './hardsoftskill.component.html',
  styleUrls: ['./hardsoftskill.component.scss'],
})
export class HardsoftskillComponent implements OnInit, OnDestroy {
  skills: Skill[] = [];
  isAuthenticated: boolean = false;
  private languageSubscription: Subscription;
  private jsonDataSubscription: Subscription;
  selectedLanguage: string = 'es';
  jsonData: any; // Variable para almacenar los datos JSON

  constructor(
    private datosSkill: SkillService,
    public dialog: MatDialog,
    private authService: AuthService,
    private languageService: LanguageService,
    private jsonLoaderService: JsonLoaderService
  ) {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe((language) => {
      this.selectedLanguage = language;
      this.jsonLoaderService.loadJsonData(language);
    });

    this.jsonDataSubscription = this.jsonLoaderService.jsonData$.subscribe((jsonData) => {
      // Ajusta esto según la estructura real de tu JSON y las habilidades
      this.jsonData = jsonData; // Ajusta 'hardsoftskills' según tu estructura de datos
    });

    this.datosSkill.traerSkills().subscribe((datos) => {
      // Ajusta esto según la estructura real de tus habilidades
      this.skills = datos.map((dato) => {
        return {
          id: dato.id,
          nombre: dato.nombre,
          porcentaje: Number(dato.porcentaje),
        };
      });
    });
  }

  ngOnInit(): void {
    this.datosSkill.dataUpdated.subscribe(() => {
      this.datosSkill.traerSkills().subscribe((datos) => {
        this.skills = datos;
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
      this.datosSkill.traerSkills().subscribe((data) => {
        this.skills = data;
      });
    });
  }

  editar(skills: Skill): void {
    const dialog = this.dialog.open(EditarComponent, { data: skills });

    dialog.afterClosed().subscribe(() => {
      this.datosSkill.traerSkills().subscribe((data) => {
        this.skills = data;
      });
    });
  }

  delete(objetoAEliminar: Skill): void {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: objetoAEliminar,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.datosSkill.traerSkills().subscribe((data) => {
        this.skills = data;
      });
    });
  }
}