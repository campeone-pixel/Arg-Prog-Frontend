import { Component } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  miPortfolio: any;
  constructor(private datosPortfolio: PortfolioService){}
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.miPortfolio = data;
    });
  }
}
