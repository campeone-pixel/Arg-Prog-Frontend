import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  dataUpdated = new EventEmitter<void>();
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'persona';

  constructor(private http: HttpClient) {}

  traerPersonas(): Observable<Persona[]> {
    return this.http.get<any>(`${this.apiUrl}/${this.endpoint}/todo`).pipe(
      map(response => response.dataResponse) // Accede a los datos dentro de dataResponse
    );
  }

  crearPer(per: Persona): Observable<Persona> {
    this.dataUpdated.emit();
    return this.http.post<Persona>(
      `${this.apiUrl}/${this.endpoint}/crear`,
      per
    );
  }

  actualizarPer(per: Persona): Observable<Persona> {
    this.dataUpdated.emit();
    return this.http.put<Persona>(
      `${this.apiUrl}/${this.endpoint}/editar`,
      per
    );
  }

  eliminarPer(id: number): Observable<void> {
    this.dataUpdated.emit();
    return this.http.delete<void>(
      `${this.apiUrl}/${this.endpoint}/eliminar/${id}`
    );
  }
}