import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Skill } from 'src/app/models';
import { SkillService } from 'src/app/services/skill.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarComponent } from './abm/agregar/agregar.component';


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

  agregarExp(): void {
    const dialog = this.dialog.open(AgregarComponent);
  }
}
