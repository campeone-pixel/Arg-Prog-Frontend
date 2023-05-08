import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'educations';

  constructor(private http: HttpClient) {}

  traerEducations(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiUrl}/${this.endpoint}`);
  }

  traerEducationsPorID(id: number): Observable<Educacion> {
    return this.http.get<Educacion>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }

  crearEdu(edu: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(`${this.apiUrl}/${this.endpoint}`, edu);
  }

  actualizarEdu(edu: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(`${this.apiUrl}/${this.endpoint}/${edu.id}`, edu);
  }

  eliminarEdu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }
}
