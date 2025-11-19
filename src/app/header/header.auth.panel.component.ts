import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-header-auth-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-panel">
      <ng-container *ngIf="isAuthenticated; else notLoggedIn">
        <p>{{ t('HEADER.HELLO_TEXT') }}, {{ username }}</p>
        <button (click)="logout()">{{ t('HEADER.BOTTON_LOGOUT') }}</button>
      </ng-container>

      <ng-template #notLoggedIn>
        <button routerLink="/login">{{ t('HEADER.BOTTON_LOGIN') }}</button>
        <button routerLink="/register">{{ t('HEADER.BOTTON_REGISTRATION') }}</button>
      </ng-template>
    </div>
  `,
  styles: [`
    .auth-panel {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    button {
      background: var(--botton-bg);
      border: none;
      padding: 8px 12px;
      cursor: pointer;
      color: var(--botton-text);
      font-weight: bold;
      border-radius: 4px;
    }

    button:hover {
      background: var(--botton-bg-hover);
      color: var(--botton-text-hover);
    }
  `]
})
export class HeaderAuthPanelComponent {
  isAuthenticated = false;
  username = 'Гость';

  constructor(private auth: AuthService, private translate: TranslateService) {
    this.auth.token$.subscribe(token => {
      if (token) {
        this.isAuthenticated = true;
        this.username = this.extractUsername(token) || 'Неизвестный';
      } else {
        this.isAuthenticated = false;
        this.username = 'Гость';
      }
    });
  }

  t(key: string) {
    return this.translate.t(key);
  }

  logout() {
    this.auth.logout();
    this.isAuthenticated = false;
    this.username = 'Гость';
  }

  private extractUsername(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.unique_name || null;
    } catch {
      return null;
    }
  }
}