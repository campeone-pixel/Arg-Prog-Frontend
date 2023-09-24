import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'educacion';
  dataUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  traerEducations(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiUrl}/${this.endpoint}/todo`);
  }

  crearEdu(edu: Educacion): Observable<void> {
    this.dataUpdated.emit();
    return this.http.post<void>(`${this.apiUrl}/${this.endpoint}/crear`, edu);
  }

  actualizarEdu(edu: Educacion): Observable<void> {
    this.dataUpdated.emit();
    return this.http.put<void>(`${this.apiUrl}/${this.endpoint}/editar`, edu);
  }

  eliminarEdu(id: number): Observable<void> {
    this.dataUpdated.emit();
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/eliminar/${id}`);
  }
}
