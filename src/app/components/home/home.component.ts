import { Component } from '@angular/core';
import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona.service';
import { PortfolioService } from 'src/app/services/portfolio.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
datos:Persona|null = null

  constructor(private aboutMeService: PersonaService){
    this.aboutMeService.traerPersonas().subscribe((datos)=>{
      this.datos = datos
 
    })
    }

 
}
