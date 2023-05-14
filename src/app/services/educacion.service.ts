import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'educacion';

  constructor(private http: HttpClient) {}

  traerEducations(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiUrl}/get/${this.endpoint}`).pipe(map(data => data));
  }



  crearEdu(edu: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(`${this.apiUrl}/crear/${this.endpoint}`, edu);
  }

  actualizarEdu(edu: Educacion): Observable<Educacion> {
    return this.http.patch<Educacion>(`${this.apiUrl}/editar/${this.endpoint}`, edu);
  }

  eliminarEdu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/borrar/${this.endpoint}/${id}`);
  }
}
