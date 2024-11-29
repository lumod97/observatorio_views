import { AllowedAnswer } from './allowed-answer.model';
import { QuestionType } from './question_type.model';

export interface Question {
  id: number;                // Identificador único de la pregunta
  surveyId: number;          // ID de la encuesta asociada
  text: string;              // Texto de la pregunta
  type: QuestionType;        // Tipo de pregunta (enum)
  allowedAnswers?: AllowedAnswer[]; // Respuestas permitidas para esta pregunta
}
