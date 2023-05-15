import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  usuarioLogueado: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): void {
    const loginData = {
      id: 0,
      email: email,
      contraseña: password,
    };

    this.http
      .post<any>(`${this.apiUrl}/login`, loginData)
      .subscribe((response: { token: string; }) => {
        if (response) {
          this.usuarioLogueado.next(loginData);
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(loginData));
        } else {
          this.usuarioLogueado.next(null);
        }
      });
  }

  register(email: string, password: string): Observable<any> {
    const registerData = {
      email: email,
      contraseña: password,
    };

    return this.http.post<any>(`${this.apiUrl}/crear/usuario`, registerData);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.usuarioLogueado.next(null);
  }

  isAuthenticated(): boolean {
    return (
      !!localStorage.getItem('currentUser') && !!localStorage.getItem('token')
    );
  }
}
