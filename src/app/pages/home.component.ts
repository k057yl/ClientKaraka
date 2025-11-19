import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home">
      <div class="home-content">
        <h1>{{ translate.t('HOME.WELCOME') }}</h1>
        <p class="desc">{{ translate.t('HOME.GREETING_TEXT')}}</p>
        <div class="btn-group" *ngIf="!isAuthenticated">
          <button routerLink="/register" class="home-btn register">
            {{ translate.t('HOME.BOTTON_REGISTRATION') }}
          </button>
          <button routerLink="/login" class="home-btn login">
            {{ translate.t('HOME.BOTTON_LOGIN') }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      padding: 40px;
    }

    .home-content {
      max-width: 600px;
    }

    h1 {
      font-size: 2.2rem;
      margin-bottom: 20px;
    }

    .desc {
      color: var(--main-text);
      font-size: 1.1rem;
      line-height: 1.5;
      margin-bottom: 15px;
    }

    .btn-group {
      margin-top: 30px;
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .home-btn {
      padding: 10px 20px;
      font-size: 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.2s;
    }

    .register {
      background-color: #007bff;
      color: white;
    }

    .login {
      background-color: #e0e0e0;
      color: #333;
    }

    .home-btn:hover {
      transform: scale(1.05);
      opacity: 0.9;
    }
  `]
})
export class HomeComponent {
  isAuthenticated = false;

  constructor(private auth: AuthService, public translate: TranslateService) {
    this.auth.token$.subscribe(token => {
      this.isAuthenticated = !!token;
    });
  }
}