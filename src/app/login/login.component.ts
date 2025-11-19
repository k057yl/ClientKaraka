import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="login-wrapper">
        <h3 class="fade-in">Login</h3>
        <input placeholder="Email" [(ngModel)]="email" class="fade-in delay-1">
        <input type="password" placeholder="Password" [(ngModel)]="password" class="fade-in delay-2">
        <button (click)="login()" class="fade-in delay-3">Login</button>

        <p *ngIf="isLoggedIn" class="greeting fade-in delay-4">
          Привет, {{ email }}!
        </p>

        <p *ngIf="!isLoggedIn && message" class="error fade-in delay-4">
          {{ message }}
        </p>
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

    .greeting {
      margin-top: 1rem;
      color: #4ef0c3;
      font-weight: bold;
    }

    .error {
      margin-top: 1rem;
      color: #ff7777;
    }

    /* Анимации */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-in {
      opacity: 0;
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .delay-1 { animation-delay: 0.2s; }
    .delay-2 { animation-delay: 0.4s; }
    .delay-3 { animation-delay: 0.6s; }
    .delay-4 { animation-delay: 0.8s; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  isLoggedIn = false;

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: { token: string; user: any }) => {
        this.auth.saveToken(res.token);
        this.auth.setUser(res.user);

        // Перезагрузка + редирект на главную
        window.location.href = '/';
      },
      error: () => {
        this.message = 'Ошибка входа';
      }
    });
  }
}