import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  template: `
    <div class="layout">
      <app-header></app-header>

      <main class="main" (click)="hidePanel()">
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        <span>© 2025 Karakatsiya</span>
        <div class="social">
          <a href="#" target="_blank">🐦</a>
          <a href="#" target="_blank">📘</a>
          <a href="https://k057yl.github.io/AboutMe/" target="_blank">📸</a>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }

    .layout { display: flex; flex-direction: column; min-height: 100vh; }
    .main { flex: 1; overflow-y: auto; padding: 1rem; background: var(--main-bg); }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      height: 60px;
      background: var(--main-bg); 
      border-top: 1px solid rgba(255,255,255,0.1);
      font-size: 14px;
    }

    .footer .social { display: flex; gap: 12px; }

    .footer .social a { color: var(--input-text); text-decoration: none; transition: color 0.2s; }
    .footer .social a:hover { color: var(--botton-bg); }

    @media(max-width: 768px) {
      .main { padding: 0.5rem; }
      .footer { flex-direction: column; gap: 5px; text-align: center; height: auto; padding: 10px; }
    }
  `]
})
export class AppComponent {
  isPanelVisible = false;

  togglePanel() { this.isPanelVisible = !this.isPanelVisible; }
  hidePanel() { if (this.isPanelVisible) this.isPanelVisible = false; }
}