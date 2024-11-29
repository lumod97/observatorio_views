import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question } from '../../models/question.model';
import { QuestionType } from '../../models/question_type.model';
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-survey',
  standalone: true,
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class SurveyComponent {
  surveys: Survey[] = [];

  answers: any[] = []; // Respuestas de la encuesta

  selectedSurveyId: number = 0; // Para almacenar el ID de la encuesta seleccionada

  selectedSurvey: Survey = {
    id: 0, name: '', createdAt: new Date(), isEnabled: true,
    createdBy: 1, questions: [{ id: 0, text: '' }]
  };
  isEditing = false;
  currentPage = 1;
  totalPages = 3; // Cambiar según el backend

  selectedQuestion: Question = {
    id: 0,
    surveyId: this.selectedSurvey.id, // Esto debe asignarse con la encuesta actual
    text: '',
    type: QuestionType.MULTIPLE_CHOICE,
    allowedAnswers: []
  };

  constructor(private router: Router, private surveyService: SurveyService, private questionService: QuestionService, private answerService: AnswerService
  ) {
    this.loadSurveys();
  }

  openModal() {
    this.isEditing = false;
    this.selectedSurvey = {
      id: 1,
      name: '',
      createdAt: new Date(),
      isEnabled: true,
      createdBy: 1,
      questions: [{ id: 0, text: '' }]
    };

    const modalElement = document.getElementById('surveyModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  editSurvey(survey: Survey) {
    console.log(survey)
    this.isEditing = true;
    this.selectedSurvey = { ...survey };
    const modalElement = document.getElementById('surveyModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  saveSurvey() {
    console.log(this.selectedSurvey);

    if (this.isEditing) {
      this.surveyService
        .getSurveyById(this.selectedSurvey.id)
        .subscribe((survey) => {
          Object.assign(survey, this.selectedSurvey);
          this.loadSurveys(); // Recargar encuestas después de actualizar
        });
    } else {
      this.surveyService.createSurvey(this.selectedSurvey).subscribe((newSurvey) => {
        this.surveys.push(newSurvey);

        // Mostrar el SweetAlert de éxito
        Swal.fire({
          title: 'Encuesta Creada',
          text: 'La encuesta se ha creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Cerrar el modal después de la alerta
          const modalElement = document.getElementById('surveyModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        });
      });
    }
  }


  deleteSurvey(id: number) {
    this.surveyService.deleteSurvey(id).subscribe(() => {
      this.surveys = this.surveys.filter((survey) => survey.id !== id);
    });
  }

  loadSurveys() {
    this.surveyService.getSurveys().subscribe((data) => {
      this.surveys = data;
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    // Aquí llamar al backend para obtener los datos de la nueva página
  }

  // Agrega esta función para abrir el modal de agregar preguntas
  openAddQuestionsModal(surveyId: number) {
    this.isEditing = false;
    this.selectedQuestion = {
      id: 0,
      surveyId: 1, // Asignar la encuesta al que pertenece la pregunta
      text: '',
      type: QuestionType.MULTIPLE_CHOICE,
      allowedAnswers: [],
    };
    const modalElement = document.getElementById('questionModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  onQuestionTypeChange() {
    if (this.selectedQuestion.type !== 'MULTIPLE_CHOICE') {
      this.selectedQuestion.allowedAnswers = [];
    }
  }

  addAnswer() {
    if (!this.selectedQuestion.allowedAnswers) {
      this.selectedQuestion.allowedAnswers = []; // Verifica si 'allowedAnswers' no está definido y inicialízalo
    }
    this.selectedQuestion.allowedAnswers.push({
      answerText: '',
      id: 0,
      questionId: 1
    });
  }

  removeAnswer(index: number) {
    if (this.selectedQuestion.allowedAnswers && this.selectedQuestion.allowedAnswers.length > index) {
      this.selectedQuestion.allowedAnswers.splice(index, 1);
    }
  }

  saveQuestion() {
    if (this.isEditing) {
      // Editar pregunta existente
      this.questionService.updateQuestion(this.selectedQuestion).subscribe(() => {
        // Recargar preguntas y cerrar el modal
        Swal.fire({
          title: 'Pregunta Actualizada',
          text: 'La pregunta se ha actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Cerrar el modal después de la alerta
          const modalElement = document.getElementById('questionModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        });
      });
    } else {
      // Crear nueva pregunta
      this.questionService.createQuestion(this.selectedQuestion).subscribe(() => {
        // Recargar preguntas y cerrar el modal
        Swal.fire({
          title: 'Pregunta Creada',
          text: 'La pregunta se ha creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Cerrar el modal después de la alerta
          const modalElement = document.getElementById('questionModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        });
      });
    }
  }


  // Método para abrir el modal y cargar las respuestas
  viewAnswers(surveyId: number) {
    this.selectedSurveyId = surveyId;
    this.answerService.getAnswersBySurveyId(surveyId).subscribe(answers => {
      console.log(answers)
      this.answers = answers;
      // Abre el modal manualmente
      const modalElement = document.getElementById('viewAnswersModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('El modal con id "viewAnswersModal" no se encontró en el DOM.');
      }
    });
  }

  // Método para eliminar una respuesta
  deleteAnswer(answerId: number): void {
    this.answerService.deleteAnswer(answerId).subscribe({
      next: () => {
        // Eliminar la respuesta del arreglo local para actualizar la vista
        this.answers = this.answers.filter(answer => answer.id !== answerId);
      },
      error: (err) => {
        console.error('Error al eliminar la respuesta:', err);
      }
    });
  }


}
