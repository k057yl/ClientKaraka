import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../services/translate.service';
import { Subscription } from 'rxjs';

export interface SaleDto {
  id: number;
  itemTitle: string;
  profit: number;
  createdAt: string;
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
        <img *ngIf="sale.photoUrls.length"
          [src]="sale.photoUrls[0]"
          class="sale-image"
          alt="sale photo" />
      </div>

      <div class="sale-content">
        <div class="sale-title">{{ translate.t('SALE_CARD.TITLE') }} {{ sale.itemTitle }}</div>
        <div class="sale-footer">
          <span>{{ translate.t('SALE_CARD.PROFIT') }} {{ sale.profit | number:'1.0-2' }}</span>
        </div>
        <div class="sale-dates">
          <div>{{ translate.t('SALE_CARD.DATE_CREATED') }}: {{ createdAtFormatted }}</div>
          <div>{{ translate.t('SALE_CARD.DATE_SOLD') }}: {{ saleDateFormatted }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sale-card { width: 300px; height: 420px; background-color: var(--item-create-bg); border-radius: 12px;
                 box-shadow: 0 4px 10px rgba(0,0,0,0.3); color: var(--main-text); overflow: hidden; padding: 10px; }
    .sale-card:hover { background-color: var(--item-card-bg-hover); box-shadow: 0 0 12px var(--item-card-border); }
    .sale-image-wrapper { width: 100%; height: 200px; border-radius: 8px; overflow: hidden; background: var(--input-bg); margin-bottom: 10px; }
    .sale-image { width: calc(100% - 20px); height: 180px; object-fit: cover; background: var(--input-bg); border-bottom: 1px solid rgba(255,255,255,0.1); margin: 10px; border-radius: 8px; }
    .sale-content { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
    .sale-title { font-size: 18px; font-weight: 600; color: var(--botton-text); }
    .sale-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
    .sale-dates { font-size: 12px; color: var(--main-text); margin-top: 8px; display: flex; flex-direction: column; gap: 4px; }
  `]
})
export class SaleCardComponent implements OnInit, OnDestroy {
  @Input() sale!: SaleDto;

  createdAtFormatted = '';
  saleDateFormatted = '';
  private sub!: Subscription;

  constructor(public translate: TranslateService) {}

  ngOnInit() {
    this.formatDates(this.translate.getCurrentLang());

    this.sub = this.translate.lang$.subscribe(lang => this.formatDates(lang));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private formatDates(lang: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    if (!this.sale) return;

    this.createdAtFormatted = new Date(this.sale.createdAt).toLocaleDateString(lang === 'uk' ? 'uk-UA' : 'en-US', options);
    this.saleDateFormatted = new Date(this.sale.saleDate).toLocaleDateString(lang === 'uk' ? 'uk-UA' : 'en-US', options);
  }
}