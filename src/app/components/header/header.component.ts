import { Component, VERSION, Input } from '@angular/core';

import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() currentSection = 'section1';
  siteLanguage = 'english';
  languageList = [
    { code: 'english', label: 'English' },
    { code: 'espaniol', label: 'Español' },
  ];

  constructor(private datosPortfolio: PortfolioService) {}
  miPortfolio: any;
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe((data) => {
      this.miPortfolio = data;
    });
  }

  changeLang(localeCode: string) {
    this.datosPortfolio.changeLang(localeCode);
  }

  scrollTo(section: string) {
    document.querySelector('#' + section)!.scrollIntoView();
  }
}
