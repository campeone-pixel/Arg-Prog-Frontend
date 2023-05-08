

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'persona';

  constructor(private http: HttpClient) {}

  traerPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}/${this.endpoint}`);
  }

  traerPersonasPorID(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }

  crearPer(per: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiUrl}/${this.endpoint}`, per);
  }

  actualizarPer(per: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${this.endpoint}/${per.id}`, per);
  }

  eliminarPer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }
}
