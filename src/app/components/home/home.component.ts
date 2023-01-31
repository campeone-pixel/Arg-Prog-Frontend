import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private datosPortfolio: PortfolioService) {}
  miPortfolio: any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.miPortfolio = data;
    });
  }
}
