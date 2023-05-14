import { Component } from '@angular/core';
import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

datos:Persona|null=null
constructor(private aboutMeService: PersonaService){
this.aboutMeService.traerPersonas().subscribe((datos)=>{
this.datos = datos
})
}
}
