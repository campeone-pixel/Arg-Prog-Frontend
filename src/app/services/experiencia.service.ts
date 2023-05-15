import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiences } from '../models/experiencia.model';




@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'experiencia';
  private dataSubject = new Subject<any>();

  constructor(private http: HttpClient) {}

  traerExperiencias(): Observable<Experiences[]> {
    return this.http
      .get<Experiences[]>(`${this.apiUrl}/get/${this.endpoint}`);

  }

  crearExp(exp: Experiences): Observable<Experiences> {
    console.log(exp)
    return this.http.post<Experiences>(
      `${this.apiUrl}/crear/${this.endpoint}`,
      exp
    );
  }

  actualizarExp(exp: Experiences): Observable<Experiences> {
    return this.http.patch<Experiences>(
      `${this.apiUrl}/editar/${this.endpoint}`,
      exp
    );
  }

  eliminarExp(id: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/borrar/${this.endpoint}/${id}`
    );
  }
}
