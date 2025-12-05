import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sell-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="overlay" (click)="close()"></div>

    <div class="popup">
      <h3>Продажа "{{ title }}"</h3>

      <input
        type="number"
        [(ngModel)]="price"
        placeholder="Введите цену"
      />

      <div class="actions">
        <button class="ok-btn" (click)="confirm()">OK</button>
        <button class="cancel-btn" (click)="close()">Отмена</button>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(2px);
      z-index: 1000;
    }

    .popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #222;
      padding: 20px;
      border-radius: 10px;
      width: 280px;
      z-index: 1001;
      color: white;
      border: 1px solid #444;
      animation: fadeIn 0.25s ease-out;
    }

    input {
      width: 100%;
      padding: 8px;
      margin-top: 10px;
      background: #333;
      border: 1px solid #555;
      color: white;
      border-radius: 5px;
    }

    .actions {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }

    .ok-btn {
      background: #4ef0c3;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }

    .cancel-btn {
      background: #666;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      color: black;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translate(-50%, -45%); }
      to { opacity: 1; transform: translate(-50%, -50%); }
    }
  `]
})
export class ItemPopupComponent {
  @Input() title = '';
  @Output() confirmSale = new EventEmitter<number>();
  @Output() cancelled = new EventEmitter<void>();

  price: number | null = null;

  confirm() {
    if (!this.price || this.price <= 0) return;
    this.confirmSale.emit(this.price);
  }

  close() {
    this.cancelled.emit();
  }
}