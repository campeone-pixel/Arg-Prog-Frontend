import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';

import { ScrollSpyDirective } from './directives/scroll-spy.directive';

import { ExperiencesModule } from './components/experience/experiences.module';
import { AboutMeModule } from './components/about-me/about-me.module';
import { HardSoftSkillModule } from './components/hardsoftskill/hardsoftskill.module';
import { ProjectsModule } from './components/projects/projects.module';
import { EducationModule } from './components/education/education.module';
import { AuthModule } from './components/auth/auth.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuIdiomasComponent } from './components/menu-idiomas/menu-idiomas.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    ScrollSpyDirective,
    MenuIdiomasComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EducationModule,
    HardSoftSkillModule,
    AboutMeModule,
    ExperiencesModule,
    ProjectsModule,
    AuthModule,
    MatToolbarModule
   
  ],
 
  bootstrap: [AppComponent],
})
export class AppModule {}
