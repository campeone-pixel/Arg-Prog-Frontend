import { Component, OnInit } from '@angular/core';
import { Persona, User } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona.service';

import { AuthService } from '../../services/auth.service';
import { LanguageService } from 'src/app/services/language-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  datos: Persona | null = null;
  private languageSubscription: Subscription;
  selectedLanguage: string = 'es';
  constructor(
    private aboutMeService: PersonaService,
    private authService: AuthService,
    private languageService: LanguageService // Inyecta el servicio de LanguageService
  ) {
    this.aboutMeService.traerPersonas().subscribe((datos) => {
      this.datos = datos[0];
    });
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      (language) => {
        this.selectedLanguage = language;
      }
    );
  }
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const usuarioString = localStorage.getItem('currentUser') || '';
      const usuario: User = JSON.parse(usuarioString);

      this.authService.login(usuario.email, usuario.contraseña);
    }
  }
}
