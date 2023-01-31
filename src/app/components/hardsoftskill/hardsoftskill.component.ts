import { Component } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
@Component({
  selector: 'app-hardsoftskill',
  templateUrl: './hardsoftskill.component.html',
  styleUrls: ['./hardsoftskill.component.scss']
})
export class HardsoftskillComponent {
  skills: any;
  title:any;
  
  constructor(private datosPortfolio: PortfolioService){}
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.skills = data.section_skills.skills;
      this.title=data.section_skills.title
      
    });
  }
}
