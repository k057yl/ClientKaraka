import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button class="btn" (click)="toggle()">
      {{ label }}
    </button>
  `
})
export class ThemeToggleComponent {
  label = 'Toggle theme';
  constructor(private theme: ThemeService) {}
  toggle() { this.theme.toggle(); }
}