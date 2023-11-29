


import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter  } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'skill';
  dataUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  traerSkills(): Observable<Skill[]> {
    return this.http.get<any>(`${this.apiUrl}/${this.endpoint}/todo`).pipe(
      map(response => response.dataResponse) // Accede a los datos dentro de dataResponse
    );;
  }

  crearSkill(skill: Skill): Observable<Skill> {
    this.dataUpdated.emit();
    return this.http.post<Skill>(`${this.apiUrl}/${this.endpoint}/crear`, skill);
  }

  actualizarSkill(skill: Skill): Observable<Skill> {
    this.dataUpdated.emit();
    return this.http.put<Skill>(`${this.apiUrl}/${this.endpoint}/editar`, skill);
  }

  eliminarSkill(id: number): Observable<void> {
    this.dataUpdated.emit();
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/eliminar/${id}`);
  }
}