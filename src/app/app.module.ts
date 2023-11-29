import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthInterceptor } from './helper/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD.MM.YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD.MM.YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    ScrollSpyDirective,
    
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },
      },
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EducationModule,
    HardSoftSkillModule,
    AboutMeModule,
    ExperiencesModule,
    ProjectsModule,
    AuthModule,
    MatToolbarModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Esto permite que haya varios interceptores
    },  {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
