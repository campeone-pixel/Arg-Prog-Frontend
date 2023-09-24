import { Component, VERSION, Input } from '@angular/core';



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

  constructor() {}
  miPortfolio: any;
  ngOnInit(): void {
  
  }

  // changeLang(localeCode: string) {
  //   this.datosPortfolio.changeLang(localeCode);
  // }

  scrollTo(section: string) {
    document.querySelector('#' + section)!.scrollIntoView();
  }
}
