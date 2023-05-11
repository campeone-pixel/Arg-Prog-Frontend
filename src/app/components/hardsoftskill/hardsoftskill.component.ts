import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Educacion, Skill } from 'src/app/models';
import { SkillService } from 'src/app/services/skill.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';
import { EditarComponent } from './abm/editar/editar.component';
import { EliminarComponent } from './abm/eliminar/eliminar.component';


@Component({
  selector: 'app-hardsoftskill',
  templateUrl: './hardsoftskill.component.html',
  styleUrls: ['./hardsoftskill.component.scss'],
})
export class HardsoftskillComponent implements OnInit {
  skills: Skill[] = [];

  constructor(private datosSkill: SkillService, public dialog: MatDialog) {
    this.datosSkill.traerSkills().subscribe((datos) => {
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
