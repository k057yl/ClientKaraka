import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { TranslateService } from '../services/translate.service';
import { Lang } from '../i18n';

@Component({
  selector: 'app-header-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="controls">
      <button class="btn" (click)="toggleTheme()">
        {{ currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark' }}
      </button>

      <div class="lang-dropdown" (mouseleave)="isLangMenuOpen = false">
        <button class="btn" (click)="toggleLangMenu()">
          🌐 {{ currentLang.toUpperCase() }}
        </button>

        <div class="lang-menu" *ngIf="isLangMenuOpen">
          <button (click)="switchLang('uk')">UA</button>
          <button (click)="switchLang('en')">EN</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .controls {
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
    }

    .btn {
      background: var(--botton-bg);
      color: var(--botton-text);
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s ease;
    }

    .btn:hover {
      background: var(--botton-bg-hover);
      color: var(--botton-text-hover);
    }

    .lang-dropdown {
      position: relative;
    }

    .lang-menu {
      position: absolute;
      top: 110%;
      right: 0;
      background: #222;
      border: 1px solid #444;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      min-width: 80px;
      z-index: 100;
    }

    .lang-menu button {
      background: transparent;
      color: #fff;
      padding: 8px 12px;
      border: none;
      text-align: left;
      cursor: pointer;
      transition: background 0.2s;
    }

    .lang-menu button:hover {
      background: #444;
    }
  `]
})
export class HeaderControlsComponent {
  currentTheme: 'dark' | 'light' = 'light';
  currentLang: Lang = 'en';
  isLangMenuOpen = false;

  constructor(private theme: ThemeService, private translate: TranslateService) {
    this.theme.themeChanges().subscribe(t => {
      this.currentTheme = t;
      document.body.classList.toggle('dark-theme', t === 'dark');
    });
  }

  toggleTheme() {
    this.theme.toggle();
  }

  toggleLangMenu() {
    this.isLangMenuOpen = !this.isLangMenuOpen;
  }

  switchLang(lang: Lang) {
    this.currentLang = lang;
    this.translate.switchLang(lang);
    this.isLangMenuOpen = false;
  }
}