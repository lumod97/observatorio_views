import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiUrl = 'http://217.15.175.118:8095/api/allowed-answers'; // Cambia la URL a la de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener las respuestas de una encuesta
  getAnswersBySurveyId(surveyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${surveyId}`);
  }

  // Método para eliminar una respuesta
  deleteAnswer(answerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${answerId}`);
  }
}
