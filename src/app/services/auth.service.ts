import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  usuarioLogueado: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  login(email: string, password: string): void {
    const loginData = {
      email: email,
      password: password,
    };

    this.http
      .post<any>(`${this.apiUrl}/auth/authenticate`, loginData)
      .subscribe((response) => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.usuarioLogueado.next(this.jwtHelper.decodeToken(response.access_token));
        }
      });
  }

  register(email: string, password: string): void {
    const registerData = {
      email: email,
      password: password,
    };

    this.http
      .post<any>(`${this.apiUrl}/auth/register`, registerData)
      .subscribe((response) => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.usuarioLogueado.next(this.jwtHelper.decodeToken(response.access_token));
        }
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.usuarioLogueado.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasPermission(permission: string): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.permissions.includes(permission);
    }
    return false;
  }
}