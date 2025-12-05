import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../services/translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="login-wrapper">
        <p>{{translate.t('REGISTRATION.GREETING')}}</p>
        <h3>{{translate.t('REGISTRATION.TITLE')}}</h3>

        <ng-container *ngIf="!codeSent">
          <input placeholder="{{translate.t('REGISTRATION.EMAIL')}}"
                [(ngModel)]="email"
                autocomplete="off">
          <input placeholder="{{translate.t('REGISTRATION.USERNAME')}}"
                [(ngModel)]="username"
                autocomplete="off">
          <input type="password"
                placeholder="{{translate.t('REGISTRATION.PASSWORD')}}"
                [(ngModel)]="password"
                autocomplete="new-password">
          <button (click)="register()">{{translate.t('REGISTRATION.BOTTON_REGISTRATION')}}</button>
        </ng-container>

        <ng-container *ngIf="codeSent">
          <p>{{translate.t('REGISTRATION.SEND_MESSAGE')}} {{ email }}</p>
          <input placeholder="Code"
            [(ngModel)]="code"
            autocomplete="one-time-code">
          <button (click)="confirmEmail()">{{translate.t('REGISTRATION.CONFIRM')}}</button>
        </ng-container>

        <p *ngIf="message" class="reply">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      background: var(--bg);
      animation: fadeIn 0.6s ease-out;
    }

    .login-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 300px;
      padding: 2rem;
      background: #222;
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(0,0,0,0.5);
      color: #fff;
      border: 1px solid #333;
      animation: fadeInUp 0.6s ease-out;
    }

    input {
      margin: 0.5rem 0;
      padding: 8px 12px;
      width: 100%;
      border: 1px solid #555;
      border-radius: 4px;
      background: #333;
      color: #fff;
      transition: border-color 0.3s, background 0.3s;
    }

    input:focus {
      border-color: #4ef0c3;
      background: #2a2a2a;
      outline: none;
    }

    button {
      margin-top: 0.8rem;
      padding: 10px 16px;
      background: #4ef0c3;
      color: #000;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      width: 100%;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(78,240,195,0.4);
    }

    .reply {
      margin-top: 1rem;
      color: #4ef0c3;
      font-weight: bold;
      text-align: center;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class RegisterComponent {
  email = '';
  username = '';
  password = '';
  code = '';
  message = '';
  codeSent = false;

  constructor(private auth: AuthService, public translate: TranslateService, private router: Router) {}

  register() {
    this.auth.register(this.email, this.username, this.password).subscribe({
      next: () => {
        this.message = this.translate.t('REGISTRATION.REGISTRATION_SUCCESS_CODE_SENT');
        this.codeSent = true;
      },
      error: () => this.message = this.translate.t('REGISTRATION.ERROR_REGISTRATION_FAILED')
    });
  }

  confirmEmail() {
    this.auth.confirmEmail(this.code).subscribe({
      next: () => {
        this.message = this.translate.t('REGISTRATION.CONFIRMATION_SUCCESS');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => this.message = this.translate.t('REGISTRATION.ERROR_CONFIRMATION_FAILED')
    });
  }
}