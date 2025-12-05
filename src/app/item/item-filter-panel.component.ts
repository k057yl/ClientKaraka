import { Component, EventEmitter, Output, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFilter } from '../services/item.filter.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-item-filter-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filters-wrapper">
      <div class="top-row">
        <!-- Filter Panel -->
        <div class="filter-panel">
          <button (click)="filterOpen = !filterOpen">
            {{ translate.t('FILTER_ITEM.FILTERS') }} {{ filterOpen ? '▲' : '▼' }}
          </button>
          <div class="panel" *ngIf="filterOpen">
            <button (click)="setFilter('')">{{ translate.t('FILTER_ITEM.STAT_ALL') }}</button>
            <button (click)="setFilter('available')">{{ translate.t('FILTER_ITEM.STAT_AVAILABLE') }}</button>
            <button (click)="setFilter('sold')">{{ translate.t('FILTER_ITEM.STAT_SOLD') }}</button>
          </div>
        </div>

        <!-- Sort Panel -->
        <div class="sort-panel">
          <button (click)="sortOpen = !sortOpen">
            {{ translate.t('FILTER_ITEM.SORT') }} {{ sortOpen ? '▲' : '▼' }}
          </button>
          <div class="panel" *ngIf="sortOpen">
            <button (click)="setSort('price_asc')">{{ translate.t('FILTER_ITEM.PRICE_CHEAPER') }}</button>
            <button (click)="setSort('price_desc')">{{ translate.t('FILTER_ITEM.PRICE_EXPENSIVE') }}</button>
            <button (click)="setSort('date_desc')">{{ translate.t('FILTER_ITEM.NEW') }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filters-wrapper { text-align:center; margin-bottom:15px; }
    .top-row { display:flex; justify-content:center; gap:15px; flex-wrap:wrap; }

    .filter-panel, .sort-panel { position: relative; }
    .filter-panel > button, .sort-panel > button {
      background: var(--botton-bg); color: var(--botton-text); padding:6px 12px; border:none; border-radius:4px;
      cursor:pointer; font-weight:bold; transition: background 0.2s;
    }
    .filter-panel > button:hover, .sort-panel > button:hover { background: var(--botton-bg-hover); color: var(--botton-text-hover); }

    .panel {
      position: absolute; top:100%; left:0; display:flex; flex-direction:column; gap:4px;
      background: var(--item-create-bg); border:1px solid var(--item-card-border); border-radius:4px;
      padding:5px; z-index:100; min-width:140px;
    }

    .panel button {
      background: var(--botton-bg); color: var(--botton-text); border:none; padding:4px 8px; border-radius:4px; cursor:pointer; text-align:left;
    }
    .panel button:hover { background: var(--botton-bg-hover); color: var(--botton-text-hover); }
  `]
})
export class ItemFilterPanelComponent {
  @Output() apply = new EventEmitter<Partial<ItemFilter>>();
  @Output() sortBy = new EventEmitter<ItemFilter['sortBy']>();

  filterOpen = false;
  sortOpen = false;
  currentStatus: string = '';
  currentSortBy: ItemFilter['sortBy'] = 'date_desc';

  constructor(private el: ElementRef, public translate: TranslateService) {}

  setFilter(status: string) {
    this.currentStatus = status;
    this.emitChange();
    this.filterOpen = false;
  }

  setSort(sort: ItemFilter['sortBy']) {
    this.currentSortBy = sort;
    this.sortBy.emit(sort);
    this.emitChange();
    this.sortOpen = false;
  }

  private emitChange() {
    this.apply.emit({ status: this.currentStatus, sortBy: this.currentSortBy });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.filterOpen = false;
      this.sortOpen = false;
    }
  }
}