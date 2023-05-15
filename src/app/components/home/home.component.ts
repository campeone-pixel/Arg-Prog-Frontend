import { Component, OnInit } from '@angular/core';
import { Persona, User } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
datos:Persona|null = null

  constructor(private aboutMeService: PersonaService,private authService:AuthService){
    this.aboutMeService.traerPersonas().subscribe((datos)=>{
      this.datos = datos
 
    })
    }
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      const usuarioString = localStorage.getItem('currentUser')||"";
      const usuario:User = JSON.parse(usuarioString);
     
      this.authService.login(usuario.email, usuario.contraseña)
    }
  }

 
}
