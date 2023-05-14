


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'skill';

  constructor(private http: HttpClient) {}

  traerSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/get/${this.endpoint}`);
  }



  crearSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}/crear/${this.endpoint}`, skill);
  }

  actualizarSkill(skill: Skill): Observable<Skill> {
    return this.http.patch<Skill>(
      `${this.apiUrl}/editar/${this.endpoint}`,
      skill
    );
  }

  eliminarSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/borrar/${this.endpoint}/${id}`);
  }
}