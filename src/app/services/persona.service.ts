

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {



  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'persona';

  constructor(private http: HttpClient) {}

  traerPersonas(): Observable<Persona | null> {
    return this.http.get<Persona[]>(`${this.apiUrl}/get/${this.endpoint}`).pipe(
      map(personas => personas.length > 0 ? personas[0] : null)
    );
  }


  crearPer(per: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiUrl}/crear/${this.endpoint}`, per);
  }

  actualizarPer(per: Persona): Observable<Persona> {
    return this.http.patch<Persona>(`${this.apiUrl}/editar/${this.endpoint}`, per);
  }

  eliminarPer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/borrar/${this.endpoint}/${id}`);
  }
}
