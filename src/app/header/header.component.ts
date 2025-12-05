import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderAuthPanelComponent } from './header.auth.panel.component';
import { HeaderControlsComponent } from './header.controls.component';
import { TranslateService } from '../services/translate.service';
import { AuthService, AppUser } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderAuthPanelComponent, HeaderControlsComponent],
  template: `
    <header class="header">
      <div class="header-left">
        <a routerLink="/" class="logo"><img src="assets/images/Logo1.png" alt="Logo" /></a>
        <span class="title">{{ translate.t('HEADER.TAGLINE') }}</span>
        <div class="auth-wrapper">
          <app-header-auth-panel></app-header-auth-panel>
          <app-header-controls></app-header-controls>
        </div>
      </div>
    </header>

    <nav class="header-nav">
      <div class="nav-buttons">
        <button routerLink="/item-create">{{ translate.t('MAIN_BOTTON_PANEL.CREATE') }}</button>
        <button *ngIf="(user$ | async)?.roles?.includes('admin')" routerLink="/category">
          {{ translate.t('MAIN_BOTTON_PANEL.CREATE_CATEGORY') }}
        </button>
        <button routerLink="/item-list">{{ translate.t('MAIN_BOTTON_PANEL.SHOW_ITEMS') }}</button>
        <button routerLink="/sale-list">{{ translate.t('MAIN_BOTTON_PANEL.SHOW_SALES') }}</button>
      </div>
    </nav>
  `,
  styles: [`
    .header {
      background-color: var(--header-bg);
      color: var(--main-text);
      padding: 10px 20px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .header-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }

    .logo img {
      height: 50px;
      object-fit: contain;
      transition: filter 0.2s ease;
    }

    .logo img:hover {
      filter: drop-shadow(0 0 6px rgba(255,255,255,0.25));
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-top: 5px;
    }

    .auth-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 5px;
      flex-wrap: wrap;
    }

    .header-nav {
      background: var(--header-bg);
      border-radius: 0 0 12px 12px;
      padding: 8px 0;
    }

    .nav-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 0 10px;
      flex-wrap: wrap;
      padding-bottom: 20px;
    }

    .header-nav button {
      background: var(--botton-bg);
      color: var(--botton-text);
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
      box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    }

    .header-nav button:hover {
      background-color: var(--botton-bg-hover);
      color: var(--botton-text-hover);
      transform: translateY(-2px);
      box-shadow: 0 3px 8px rgba(0,0,0,0.35);
    }
  `]
})
export class HeaderComponent {
  user$: Observable<AppUser | null>;

  constructor(public translate: TranslateService, public auth: AuthService) {
    this.user$ = this.auth.user$;
    const token = this.auth.getToken();
    if (token) {
      this.auth.getCurrentUser().subscribe({
        next: user => this.auth.setUser(user),
        error: () => console.warn('Не удалось получить пользователя')
      });
    }
  }
}