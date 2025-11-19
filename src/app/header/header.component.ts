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
      <div class="logo">
        <a routerLink="/"><img src="assets/images/Logo1.png" alt="Logo" /></a>
      </div>

      <span class="title">{{ translate.t('HEADER.TAGLINE') }}</span>

      <div class="header-right">
        <app-header-auth-panel></app-header-auth-panel>
        <app-header-controls></app-header-controls>
      </div>
    </header>

    <nav class="header-nav">
      <button routerLink="/item-create">{{ translate.t('MAIN_BOTTON_PANEL.CREATE') }}</button>

      <!-- Кнопка категории видна только админам -->
      <button *ngIf="(user$ | async)?.roles?.includes('admin')" routerLink="/category">
        {{ translate.t('MAIN_BOTTON_PANEL.CREATE_CATEGORY') }}
      </button>

      <button routerLink="/item-list">{{ translate.t('MAIN_BOTTON_PANEL.SHOW_ITEMS') }}</button>
      <button routerLink="/sale-list">{{ translate.t('MAIN_BOTTON_PANEL.SHOW_SALES') }}</button>
    </nav>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      padding: 0 20px;
      background-color: var(--main-bg);
      color: var(--main-text);
      position: relative;
    }

    .logo {
      position: absolute;
      left: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo img {
      height: 40px;
      object-fit: contain;
    }

    .header-right {
      position: absolute;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }

    .header-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      padding: 8px 0;
      background-color: var(--left-panel-bg);
    }

    .header-nav button {
      background: var(--botton-bg);
      color: var(--botton-text);
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .header-nav button:hover {
      background-color: var(--botton-bg-hover);
      color: var(--botton-text-hover);
      transform: scale(1.05);
    }
  `]
})
export class HeaderComponent {
  user$: Observable<AppUser | null>;
  isAdmin = false;

  constructor(public translate: TranslateService, public auth: AuthService) {
    this.user$ = this.auth.user$;
    this.auth.user$.subscribe(user => {
      this.isAdmin = user?.roles?.includes('admin') ?? false;
    });

    const token = this.auth.getToken();
    if (token) {
      this.auth.getCurrentUser().subscribe({
        next: user => this.auth.setUser(user),
        error: () => console.warn('Не удалось получить пользователя')
      });
    }
  }
}