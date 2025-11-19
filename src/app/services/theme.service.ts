import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme$ = new BehaviorSubject<Theme>(this.detectInitialTheme());

  themeChanges() {
    return this.theme$.asObservable();
  }

  setTheme(t: Theme) {
    this.theme$.next(t);
    try { localStorage.setItem('app-theme', t); } catch {}
  }

  toggle() {
    const next = this.theme$.value === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  private detectInitialTheme(): Theme {
    try {
      const saved = localStorage.getItem('app-theme') as Theme | null;
      if (saved) return saved;
    } catch {}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}