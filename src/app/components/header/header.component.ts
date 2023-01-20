import { Component, VERSION,Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
    

  constructor(private translate: TranslateService) {}
  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translate.use(localeCode);
    }
    const currentLanguage = this.translate.currentLang;
  }


  scrollTo(section:string) {
    document.querySelector('#' + section)!
    .scrollIntoView();
  }


 





}
