import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject,switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  language = new BehaviorSubject<string>('espaniol');

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.language.asObservable().pipe(
      switchMap(lang => this.http.get(`./assets/i18n/${lang}.json`))
     )
  }

 changeLang(value: string) {
   // update the value of this BehaviorSubject, and all 
   // subscribers notify about it 
   this.language.next(value);
 }
}