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
  private readonly endpoint = 'proyecto';

  constructor(private http: HttpClient) {}

  traerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiUrl}/get/${this.endpoint}`);
  }


  crearProy(proy: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${this.apiUrl}/crear/${this.endpoint}`, proy);
  }

  actualizarProy(proy: Proyecto): Observable<Proyecto> {
    return this.http.patch<Proyecto>(
      `${this.apiUrl}/editar/${this.endpoint}`,
      proy
    );
  }

  eliminarProy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/borrar/${this.endpoint}/${id}`);
  }
}
