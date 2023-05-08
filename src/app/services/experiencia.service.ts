import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiences } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'experiences';

  constructor(private http: HttpClient) {}

  traerExperiencias(): Observable<Experiences[]> {
    return this.http.get<Experiences[]>(`${this.apiUrl}/${this.endpoint}`);
  }

  traerExperienciasPorID(id: number): Observable<Experiences> {
    return this.http.get<Experiences>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }

  crearExp(exp: Experiences): Observable<Experiences> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Experiences>(`${this.apiUrl}/${this.endpoint}`, exp,httpOptions);
  }

  actualizarExp(exp: Experiences ): Observable<Experiences> {
    return this.http.put<Experiences>(`${this.apiUrl}/${this.endpoint}/${exp.id}`, exp);
  }

  eliminarExp(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }
}

