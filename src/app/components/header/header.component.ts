import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language-service.service';

import { JsonLoaderService } from 'src/app/services/json-loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @Input() currentSection = 'section1';
  selectedLanguage: string = 'es';
  data: any;

  private jsonDataSubscription?: Subscription;


  constructor(
    private languageService: LanguageService,
    private jsonLoaderService: JsonLoaderService
  ) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.selectedLanguage = language;
      this.jsonLoaderService.loadJsonData(language);
    });

    this.jsonDataSubscription = this.jsonLoaderService.jsonData$.subscribe((data) => {
      this.data = data;
    });
  }


  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    if (this.jsonDataSubscription) {
      this.jsonDataSubscription.unsubscribe();
    }
  }

  scrollTo(section: string) {
    document.querySelector('#' + section)!.scrollIntoView();
  }

}