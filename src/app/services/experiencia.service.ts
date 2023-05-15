import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiences } from '../models/experiencia.model';
import { EventEmitter } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'experiencia';

  dataUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  traerExperiencias(): Observable<Experiences[]> {
    return this.http
      .get<Experiences[]>(`${this.apiUrl}/get/${this.endpoint}`);

  }

  crearExp(exp: Experiences): Observable<Experiences> {
    this.dataUpdated.emit();
  
    return this.http.post<Experiences>(
      `${this.apiUrl}/crear/${this.endpoint}`,
      exp
    );
  }

  actualizarExp(exp: Experiences): Observable<Experiences> {
    this.dataUpdated.emit();
    return this.http.patch<Experiences>(
      `${this.apiUrl}/editar/${this.endpoint}`,
      exp
    );
  }

  eliminarExp(id: number | undefined): Observable<void> {
    this.dataUpdated.emit();
    return this.http.delete<void>(
      `${this.apiUrl}/borrar/${this.endpoint}/${id}`
    );
  }
}
