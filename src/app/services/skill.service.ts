


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
  private readonly endpoint = 'skills';

  constructor(private http: HttpClient) {}

  traerSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/${this.endpoint}`);
  }

  traerSkillsPorID(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }

  crearSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}/${this.endpoint}`, skill);
  }

  actualizarSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(
      `${this.apiUrl}/${this.endpoint}/${skill.id}`,
      skill
    );
  }

  eliminarSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }
}