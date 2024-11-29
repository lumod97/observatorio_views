import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = 'http://127.0.0.1:8080/api/surveys'; // Endpoint del backend

  constructor(private http: HttpClient) {}

  // Obtener todas las encuestas
  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  // Obtener una encuesta por id
  getSurveyById(id: number): Observable<Survey> {
    return this.http.get<Survey>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva encuesta
  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.apiUrl, survey);
  }

  // Eliminar una encuesta por id
  deleteSurvey(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
