import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './components/home/home.component';

import { ScrollSpyDirective } from './directives/scroll-spy.directive';

import { PortfolioService } from './services/portfolio.service';
import { BannerComponent } from './components/banner/banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExperiencesModule } from './components/experience/experiences.module';

import { AboutMeModule } from './components/about-me/experiences.module';
import { HardSoftSkillModule } from './components/hardsoftskill/hardsoftskill.module';
import { ProjectsModule } from './components/projects/projects.module';
import { EducationModule } from './components/education/education.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    HomeComponent,
    ScrollSpyDirective,
 
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EducationModule,
    HardSoftSkillModule,
    AboutMeModule,
    ExperiencesModule,
    ProjectsModule
  ],
  providers: [PortfolioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
