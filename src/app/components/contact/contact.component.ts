import { Component } from '@angular/core';
import {PortfolioService} from "../../services/portfolio.service"
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  miPortfolio: any;
  constructor(private datosPortfolio: PortfolioService){}
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.miPortfolio = data;
    });
  }
}
