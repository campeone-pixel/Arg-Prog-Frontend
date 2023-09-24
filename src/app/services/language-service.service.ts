import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;

  constructor() {
    this.currentLanguageSubject = new BehaviorSubject<string>('es'); 
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setCurrentLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
  }
}