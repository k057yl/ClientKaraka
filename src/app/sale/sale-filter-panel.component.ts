import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaleFilter } from '../services/sale.filter.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-sale-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filters-wrapper">
      <button class="filter-toggle" (click)="filtersOpen = !filtersOpen">
        {{ translate.t('FILTER_SALE.FILTERS') }} {{ filtersOpen ? '▲' : '▼' }}
      </button>

      <div class="filters" *ngIf="filtersOpen">
        <div class="sort-block">
          <button (click)="setSort('profit_asc')">{{ translate.t('FILTER_SALE.PROFIT_MIN') }}</button>
          <button (click)="setSort('profit_desc')">{{ translate.t('FILTER_SALE.PROFIT_MAX') }}</button>
          <button (click)="setSort('date_desc')">{{ translate.t('FILTER_SALE.NEW') }}</button>
        </div>
        <div class="filter-row">
          <label>{{ translate.t('FILTER_SALE.FROM_DATE') }}</label>
          <input type="date" [(ngModel)]="startDate" />
          <label>{{ translate.t('FILTER_SALE.TO_DATE') }}</label>
          <input type="date" [(ngModel)]="endDate" />
        </div>

        <div class="filter-row">
          <label>{{ translate.t('FILTER_SALE.PROFIT_FROM') }}</label>
          <input type="number" [(ngModel)]="minProfit" />
          <label>{{ translate.t('FILTER_SALE.PROFIT_TO') }}</label>
          <input type="number" [(ngModel)]="maxProfit" />
        </div>

        <div class="buttons-row">
          <button class="apply-btn" (click)="applyFilter()">{{ translate.t('FILTER_SALE.APPLY') }}</button>
          <button class="reset-btn" (click)="resetFilter()">{{ translate.t('FILTER_SALE.RESET') }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filters-wrapper {
      text-align: center;
      margin-bottom: 15px;
    }

    .filter-toggle {
      background: var(--botton-bg);
      color: var(--botton-text);
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin-bottom: 8px;
      transition: background 0.2s;
    }

    .filter-toggle:hover {
      background: var(--botton-bg-hover);
      color: var(--botton-text-hover);
    }

    .filters {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      background: var(--item-create-bg);
      border-radius: 8px;
      border: 1px solid var(--item-card-border);
      max-width: 700px;
      margin: 0 auto 15px;
    }

    .filter-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    .filter-row label {
      font-weight: bold;
    }

    .filters input {
      padding: 5px 8px;
      border: 1px solid var(--item-card-border);
      border-radius: 4px;
      background: var(--input-bg);
      color: var(--input-text);
      width: 120px;
    }

    .sort-block {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 5px;
      flex-wrap: wrap;
    }

    .sort-block button {
      background: var(--botton-bg);
      color: var(--botton-text);
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .sort-block button:hover {
      background: var(--botton-bg-hover);
      color: var(--botton-text-hover);
    }

    .buttons-row {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .apply-btn {
      background: var(--botton-important-bg);
      color: var(--botton-text);
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .apply-btn:hover {
      background: var(--botton-important-bg-hover);
    }

    .reset-btn {
      background: #b33333;
      color: var(--botton-text);
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .reset-btn:hover {
      background: #c44444;
    }
  `]
})
export class SaleFilterPanelComponent {
  @Output() apply = new EventEmitter<Partial<SaleFilter>>();
  @Output() sortBy = new EventEmitter<SaleFilter['sortBy']>();
  @Output() reset = new EventEmitter<void>();

  constructor(public translate: TranslateService) {}

  filtersOpen = false;
  startDate?: string;
  endDate?: string;
  minProfit?: number;
  maxProfit?: number;
  currentSortBy: SaleFilter['sortBy'] = 'date_desc';

  applyFilter() {
    this.apply.emit({
      startDate: this.startDate,
      endDate: this.endDate,
      minProfit: this.minProfit,
      maxProfit: this.maxProfit,
      sortBy: this.currentSortBy
    });
  }

  setSort(order: SaleFilter['sortBy']) {
    this.currentSortBy = order;
    this.sortBy.emit(order);
    this.applyFilter();
  }

  resetFilter() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.minProfit = undefined;
    this.maxProfit = undefined;
    this.currentSortBy = 'date_desc';
    this.reset.emit();
  }
}