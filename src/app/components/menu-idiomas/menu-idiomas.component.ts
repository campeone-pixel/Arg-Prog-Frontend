import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service.service';

@Component({
  selector: 'app-menu-idiomas',
  templateUrl: './menu-idiomas.component.html',
  styles: [
  ]
})
export class MenuIdiomasComponent {
  availableLanguages: string[] = ['es', 'en']; // Lista de idiomas disponibles
  selectedLanguage: string = 'es'; // Idioma seleccionado por defecto

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {}

  changeLanguage(event: any): void {
    if (event && event.target) {
      const selectedLanguage = event.target.value;
      this.selectedLanguage = selectedLanguage;
      this.languageService.setCurrentLanguage(selectedLanguage);
    }
  }
  
  
}
