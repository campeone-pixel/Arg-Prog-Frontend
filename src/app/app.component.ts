import { Component,VERSION } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
private URL = '../assets/i18n/espaniol.json';
currentSection = 'home';
title = 'asdfasdf'

 constructor(
  private translateService: TranslateService,
  private httpClient: HttpClient
  )
{
  this.translateService.setDefaultLang('english');
  this.translateService.addLangs(['english','espaniol'])
  
}

ngOnInit(): void {
  fetch('../assets/i18n/espaniol.json').then(res => res.json())
  .then(); // do something with data
  this.httpClient.get(this.URL).subscribe();
}



onSectionChange(sectionId: string) {
  this.currentSection = sectionId;
}


  
  
}
