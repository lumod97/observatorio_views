import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://127.0.0.1:8080/api/questions'; // Endpoint del backend

  constructor(private http: HttpClient) {}

  // Crear una nueva pregunta
  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, question);
  }

  // Actualizar una pregunta existente
  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${question.id}`, question);
  }

  // Obtener todas las preguntas
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  // Obtener una pregunta por ID
  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }

  // Eliminar una pregunta
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
