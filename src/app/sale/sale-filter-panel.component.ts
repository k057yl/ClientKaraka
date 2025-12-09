import { Component, EventEmitter, Output, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaleFilter } from '../services/sale.filter.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-sale-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-wrapper">

      <div class="top-row">

        <!-- Sort Panel -->
        <div class="sort-panel">
          <button (click)="sortOpen = !sortOpen">
            {{ translate.t('FILTER_SALE.SORT') }}:
            {{ getSortLabel() }}
            {{ sortOpen ? '▲' : '▼' }}
          </button>

          <div class="panel sort-body" *ngIf="sortOpen">
            <button (click)="setSort('profit_asc')">{{ translate.t('FILTER_SALE.PROFIT_MIN') }}</button>
            <button (click)="setSort('profit_desc')">{{ translate.t('FILTER_SALE.PROFIT_MAX') }}</button>
            <button (click)="setSort('date_desc')">{{ translate.t('FILTER_SALE.NEW') }}</button>
          </div>
        </div>

        <!-- Filter Panel -->
        <div class="filter-panel">
          <button (click)="filtersOpen = !filtersOpen">
            {{ translate.t('FILTER_SALE.FILTERS') }}
            {{ filtersOpen ? '▲' : '▼' }}
          </button>

          <div class="panel filter-body" *ngIf="filtersOpen">

            <!-- DATES -->
            <div class="block date-block">
              <label>{{ translate.t('FILTER_SALE.FROM_DATE') }}</label>
              <input type="date" [(ngModel)]="startDate" />

              <label>{{ translate.t('FILTER_SALE.TO_DATE') }}</label>
              <input type="date" [(ngModel)]="endDate" />
            </div>

            <!-- PROFIT RANGE SLIDER -->
            <div class="block slider-block">
              <label>{{ translate.t('FILTER_SALE.PROFIT_RANGE') }}</label>

              <div class="range-container">

                <input type="range"
                       min="0"
                       [max]="maxLimit"
                       [(ngModel)]="minProfit"
                       (input)="onSliderChange()"/>

                <input type="range"
                       min="0"
                       [max]="maxLimit"
                       [(ngModel)]="maxProfit"
                       (input)="onSliderChange()"/>

                <div class="slider-values">
                  <span>{{ minProfit }}</span>
                  <span>{{ maxProfit }}</span>
                </div>

              </div>
            </div>

            <div class="buttons-row">
              <button class="reset-btn" (click)="resetFilter()">{{ translate.t('FILTER_SALE.RESET') }}</button>
            </div>

          </div>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .filter-wrapper { text-align:center; margin-bottom:15px; }

    .top-row {
      display:flex;
      justify-content:center;
      gap:15px;
      flex-wrap:wrap;
    }

    /* INDIVIDUAL PANELS */
    .sort-panel { position:relative; width:180px; }
    .filter-panel { position:relative; width:320px; max-width:90vw; }

    .sort-panel > button,
    .filter-panel > button {
      background: var(--botton-bg);
      color: var(--botton-text);
      padding:6px 12px;
      border:none;
      border-radius:4px;
      cursor:pointer;
      font-weight:bold;
      transition: background 0.2s;
      width:100%;
    }

    .sort-panel > button:hover,
    .filter-panel > button:hover {
      background: var(--botton-bg-hover);
      color: var(--botton-text-hover);
    }

    /* POPUP PANELS */
    .panel {
      position:absolute;
      top:100%;
      left:0;
      display:flex;
      flex-direction:column;
      gap:6px;
      background: var(--item-create-bg);
      border:1px solid var(--item-card-border);
      border-radius:4px;
      padding:10px;
      z-index:100;
      box-sizing:border-box;
    }

    .sort-body { min-width:180px; }
    .filter-body { width:100%; }

    /* DATE GRID */
    .block.date-block {
      width:100%;
      display:grid;
      grid-template-columns:90px minmax(0,1fr);
      align-items:center;
      gap:8px;
    }

    .block.date-block label { justify-self:end; }
    .block.date-block input { width:160px; }

    .panel button {
      background: var(--botton-bg);
      color: var(--botton-text);
      border:none;
      padding:6px 10px;
      border-radius:4px;
      cursor:pointer;
      text-align:left;
      transition: background 0.2s;
    }

    .panel button:hover {
      background: var(--botton-bg-hover);
      color: var(--botton-text-hover);
    }

    .block {
      display:flex;
      gap:6px;
      flex-wrap:wrap;
      justify-content:center;
      align-items:center;
    }

    label { font-weight:bold; }

    input {
      padding:5px 8px;
      border:1px solid var(--item-card-border);
      border-radius:4px;
      background: var(--input-bg);
      color: var(--input-text);
      width:120px;
    }

    /* SLIDER */
    .slider-block {
      width:100%;
      display:flex;
      flex-direction:column;
      align-items:center;
    }

    .range-container {
      width: 100%;
      max-width: 260px;
      position: relative;
      margin: 10px;
      height: 8px;
    }

    .range-container input[type=range] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 8px;
      pointer-events: none;
      background: none;
      -webkit-appearance: none;
    }

    .range-container input[type=range]:first-child { z-index:2; }
    .range-container input[type=range]:last-child { z-index:3; }

    .range-container input[type=range]::-webkit-slider-thumb {
      pointer-events:auto;
      width:16px;
      height:16px;
      border-radius:50%;
      background: var(--botton-bg);
      cursor:pointer;
      -webkit-appearance:none;
    }

    .slider-values {
      display:flex;
      justify-content:space-between;
      margin-top:35px;
      font-weight:bold;
      color: var(--input-text);
    }

    .buttons-row {
      margin-top:8px;
      display:flex;
      justify-content:center;
    }

    .reset-btn {
      background:#b33333;
      color:#fff;
      border:none;
      padding:6px 12px;
      border-radius:4px;
      cursor:pointer;
    }

    .reset-btn:hover { background:#c44444; }
  `]
})
export class SaleFilterPanelComponent {
  @Output() apply = new EventEmitter<Partial<SaleFilter>>();
  @Output() sortBy = new EventEmitter<SaleFilter['sortBy']>();
  @Output() reset = new EventEmitter<void>();

  constructor(private el: ElementRef, public translate: TranslateService) {}

  sortOpen = false;
  filtersOpen = false;

  startDate?: string;
  endDate?: string;

  minProfit = 0;
  maxProfit = 5000;
  maxLimit = 20000;

  currentSortBy: SaleFilter['sortBy'] = 'date_desc';

  getSortLabel() {
    if (this.currentSortBy === 'profit_asc') return this.translate.t('FILTER_SALE.PROFIT_MIN');
    if (this.currentSortBy === 'profit_desc') return this.translate.t('FILTER_SALE.PROFIT_MAX');
    return this.translate.t('FILTER_SALE.NEW');
  }

  setSort(order: SaleFilter['sortBy']) {
    this.currentSortBy = order;
    this.sortBy.emit(order);
    this.applyFilter();
    this.sortOpen = false;
  }

  onSliderChange() {
    if (this.minProfit > this.maxProfit) {
      const t = this.minProfit;
      this.minProfit = this.maxProfit;
      this.maxProfit = t;
    }
    this.applyFilter();
  }

  applyFilter() {
    this.apply.emit({
      startDate: this.startDate,
      endDate: this.endDate,
      minProfit: this.minProfit,
      maxProfit: this.maxProfit,
      sortBy: this.currentSortBy
    });
  }

  resetFilter() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.minProfit = 0;
    this.maxProfit = 5000;
    this.currentSortBy = 'date_desc';

    this.reset.emit();
    this.applyFilter();

    this.filtersOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.sortOpen = false;
      this.filtersOpen = false;
    }
  }
}