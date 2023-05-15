import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentSection = 'home';
  title = 'asdfasdf';
  miPortfolio: any;
  constructor() {}

  ngOnInit(): void {}

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }
}
