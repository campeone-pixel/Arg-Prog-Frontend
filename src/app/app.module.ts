import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule,TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ScrollSpyDirective } from './scroll-spy.directive';

export function HttpLoaderFactory(httpClient:HttpClient){
  return new TranslateHttpLoader(httpClient, '../assets/i18n/','.json')
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectsComponent,
    HomeComponent,
    ServicesComponent,
    AboutMeComponent,
    ContactComponent,
    ScrollSpyDirective,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
        
      }
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
