import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonLoaderService {
  private jsonDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public jsonData$: Observable<any> = this.jsonDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadJsonData(language: string): void {
    let jsonUrl: string;

    if (language === 'en') {
      jsonUrl = '/assets/i18n/ingles.json';
    } else {
      jsonUrl = '/assets/i18n/espaniol.json';
    }

    this.http.get(jsonUrl).subscribe((data) => {
      this.jsonDataSubject.next(data);
    });
  }
}