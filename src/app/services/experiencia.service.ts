import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../models/experiencia.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'experiencia';

  dataUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  traerExperiencias(): Observable<Experiencia[]> {
    return this.http.get<any>(`${this.apiUrl}/${this.endpoint}/todo`).pipe(
      map(response => response.dataResponse) // Accede a los datos dentro de dataResponse
    );
  }

  crearExp(exp: Experiencia): Observable<Experiencia> {
    this.dataUpdated.emit();
    return this.http.post<Experiencia>(
      `${this.apiUrl}/${this.endpoint}/crear`,
      exp
    );
  }

  actualizarExp(exp: Experiencia): Observable<Experiencia> {
    this.dataUpdated.emit();
    return this.http.put<Experiencia>(
      `${this.apiUrl}/${this.endpoint}/editar`,
      exp
    );
  }

  eliminarExp(id: number | undefined): Observable<void> {
    this.dataUpdated.emit();
    return this.http.delete<void>(
      `${this.apiUrl}/${this.endpoint}/eliminar/${id}`
    );
  }
}