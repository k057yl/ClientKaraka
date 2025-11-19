import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../services/translate.service';

export interface SaleDto {
  id: number;
  itemTitle: string;
  profit: number;
  saleDate: string;
  photoUrls: string[];
}

@Component({
  selector: 'app-sale-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sale-card">
      <div class="sale-image-wrapper">
        <img *ngIf="sale.photoUrls"
            [src]="sale.photoUrls[0]"
            class="sale-image"
            alt="sale photo" />
      </div>

      <div class="sale-content">
        <div class="sale-title">{{ translate.t('SALE_CARD.TITLE') }} {{ sale.itemTitle }}</div>
        <div class="sale-footer">
          <span>{{ translate.t('SALE_CARD.PROFIT') }} {{ sale.profit | number:'1.0-2' }}</span>
        </div>
      </div>
    </div>`,
  styles: [`
    .sale-card {
      background-color: var(--item-create-bg);
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      color: var(--main-text);
      overflow: hidden;
      padding: 10px;
    }

    .sale-card:hover {
      background-color: var(--item-card-bg-hover);
      box-shadow: 0 0 12px var(--item-card-border);
    }

    .sale-image-wrapper {
      width: 100%;
      height: 200px;
      border-radius: 8px;
      overflow: hidden;
      background: var(--input-bg);
      margin-bottom: 10px;
    }

    .sale-image {
      width: calc(100% - 20px);
      height: 180px;
      object-fit: cover;
      background: var(--input-bg);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin: 10px;
      border-radius: 8px;
    }

    .sale-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .sale-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--botton-text);
    }

    .sale-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
  `]
})
export class SaleCardComponent {
  @Input() sale!: SaleDto;

  constructor(public translate: TranslateService) {}
}