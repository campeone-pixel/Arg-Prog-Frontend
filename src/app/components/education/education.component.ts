import { Component } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  miPortfolio: any;
  constructor(private datosPortfolio: PortfolioService){}
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.miPortfolio = data;
    });
  }
}
