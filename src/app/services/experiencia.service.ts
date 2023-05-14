import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiences } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'experiencia';
  private dataSubject = new Subject<any>();

  constructor(private http: HttpClient) {}

  traerExperiencias(): Observable<Experiences[]> {
    this.http
      .get<Experiences[]>(`${this.apiUrl}/get/${this.endpoint}`)
      .subscribe((data) => {
        this.dataSubject.next(data);
      });
    return this.dataSubject.asObservable();
  }

  crearExp(exp: Experiences): Observable<Experiences> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Experiences>(
      `${this.apiUrl}/crear/${this.endpoint}`,
      exp,
      httpOptions
    );
  }

  actualizarExp(exp: Experiences): Observable<Experiences> {
    return this.http.patch<Experiences>(
      `${this.apiUrl}/${this.endpoint}/editar`,
      exp
    );
  }

  eliminarExp(id: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/borrar/${this.endpoint}/${id}`
    );
  }
}
