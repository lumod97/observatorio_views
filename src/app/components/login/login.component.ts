import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ImageService } from '../../services/image.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { apiService } from '../../services/observatorio-backend.service';

@Component({
    selector: 'app-login',
    standalone:true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  activeForm = false;
  error = '';
  imageUrl: string = '';
  imageService = new ImageService();
  loading: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    
    // Si el token existe y no está expirado, redirigir a surveys
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['surveys']);
    }else{
      this.loadRandomImage();
    }
  }

  async onSubmit() {
    const { username, password } = this.loginForm.value;
    const params = { username, password };
  
    try {
      interface response {
        username: string,
        token: string
      }

      const data:response = await apiService.post('/api/auth/login', params);
      // console.log(data)
      localStorage.setItem('token', data.token);
      this.router.navigate(['/surveys']);
    } catch (error) {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }  

  changeForm() {
    this.activeForm = !this.activeForm;
    console.log(this.activeForm);
  }

  async loadRandomImage(): Promise<void> {
    const response : string = await apiService.get('/random-image')
    this.imageUrl = response
    console.log(response)
  }
}
