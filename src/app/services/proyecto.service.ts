import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'projects';

  constructor(private http: HttpClient) {}

  traerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiUrl}/${this.endpoint}`);
  }

  traerProyectosPorID(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }

  crearProy(proy: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${this.apiUrl}/${this.endpoint}`, proy);
  }

  actualizarProy(proy: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(
      `${this.apiUrl}/${this.endpoint}/${proy.id}`,
      proy
    );
  }

  eliminarProy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }
}
