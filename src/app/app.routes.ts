import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { SurveyComponent } from './components/survey/survey.component';

// Define las rutas para tu aplicación
export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'surveys', component: SurveyComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
