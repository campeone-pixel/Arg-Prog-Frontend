import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HomeComponent } from './components/home/home.component';

import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';


import { ScrollSpyDirective } from './scroll-spy.directive';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HardsoftskillComponent } from './components/hardsoftskill/hardsoftskill.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';

import { PortfolioService } from './services/portfolio.service';
import { BannerComponent } from './components/banner/banner.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectsComponent,
    HomeComponent,
    
    AboutMeComponent,
    ContactComponent,
    ScrollSpyDirective,
    HardsoftskillComponent,
    ExperienceComponent,
    EducationComponent,
    BannerComponent,
    
  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    HttpClientModule,

    
  ],
  providers: [PortfolioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
