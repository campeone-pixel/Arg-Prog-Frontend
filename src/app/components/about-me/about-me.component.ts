import { Component } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
  
  constructor(private datosPortfolio: PortfolioService) {}

  miPortfolio: any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.miPortfolio = data;
    });
  }
}
