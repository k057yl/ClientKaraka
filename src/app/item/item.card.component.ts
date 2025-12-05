import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../services/translate.service';

export interface ItemDto {
  id: number;
  title: string;
  description?: string;
  purchasePrice: number;
  photoUrls: string[];
  status: string;
}

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="item-card">
      <div class="item-image-wrapper">
        <img *ngIf="item.photoUrls"
            [src]="item.photoUrls[0]"
            class="item-image"
            alt="item photo" />
      </div>

      <div class="item-content">
        <div class="item-title"> {{ translate.t('ITEM_CARD.TITLE') }} {{ item.title }}</div>
        <div class="item-description"> {{ translate.t('ITEM_CARD.DESCRIPTION') }} {{ item.description }}</div>
        <div class="item-footer">
          <span>{{ translate.t('ITEM_CARD.PRICE') }} {{ item.purchasePrice | number:'1.0-2' }}</span>

          <button *ngIf="item.status === 'available'"
                  class="sell-btn"
                  (click)="sell.emit(item)">
            {{ translate.t('ITEM_CARD.BOTTON_SALE') }}
          </button>

          <span *ngIf="item.status === 'sold'" class="sold-label">{{ translate.t('ITEM_CARD.STATE') }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .item-card {
    width: 300px;
    height: 420px;
    background-color: var(--item-create-bg);
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    color: var(--main-text);
    overflow: hidden;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .item-image-wrapper {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    background: var(--input-bg);
  }

  .item-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 10px;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`]
})
export class ItemCardComponent {
  @Input() item!: ItemDto;
  @Output() sell = new EventEmitter<ItemDto>();

  constructor(public translate: TranslateService) {}
}