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
    background-color: var(--item-create-bg);
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    color: var(--main-text);
    overflow: hidden;
    padding: 10px;
  }

  .item-card:hover {
    background-color: var(--item-card-bg-hover);
    box-shadow: 0 0 12px var(--item-card-border);
  }

  .item-image-wrapper {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    background: var(--input-bg);
    margin-bottom: 10px;
  }

  .item-image {
    width: calc(100% - 20px);
    height: 180px;
    object-fit: cover;
    background: var(--input-bg);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin: 10px;
    border-radius: 8px;
  }

  .item-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .item-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--botton-text);
  }

  .item-description {
    font-size: 14px;
    color: var(--input-text);
    line-height: 1.4;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .sell-btn {
    background-color: var(--botton-bg);
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    color: var(--botton-text);
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .sell-btn:hover {
    background-color: var(--botton-bg-hover);
    transform: scale(1.05);
  }

  .sold-label {
    color: #f44336;
    font-weight: bold;
  }
`]
})
export class ItemCardComponent {
  @Input() item!: ItemDto;
  @Output() sell = new EventEmitter<ItemDto>();

  constructor(public translate: TranslateService) {}
}