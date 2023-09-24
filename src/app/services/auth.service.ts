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
  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password, // Asegúrate de que sea "password" en lugar de "contraseña"
    };

    return this.http.post<any>(`${this.apiUrl}/auth/authenticate`, loginData)
    .pipe(
      tap(response => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    const registerData = {
      email: email,
      password: password, // Asegúrate de que sea "password" en lugar de "contraseña"
    };

    return this.http.post<any>(`${this.apiUrl}/auth/register`, registerData).pipe(
      tap(response => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      })
    );// Utiliza la ruta correcta para el registro
  }


  logout(): void {
    localStorage.removeItem('token');
    this.usuarioLogueado.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}