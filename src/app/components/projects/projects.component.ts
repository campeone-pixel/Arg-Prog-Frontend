import { Component, OnInit } from '@angular/core';


import { PortfolioService } from '../../services/portfolio.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(private datosPortfolio: PortfolioService) {}
  miPortfolio: any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.miPortfolio = data;
    });
  }
}
