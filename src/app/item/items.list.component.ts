import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ItemCardComponent, ItemDto } from '../item/item.card.component';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '../services/translate.service';
import { ItemFilterService, ItemFilter } from '../services/item.filter.service';
import { ItemFilterPanelComponent } from './item-filter-panel.component';
import { ItemPopupComponent } from '../item/item-popup.component';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent,
    ItemFilterPanelComponent,
    ItemPopupComponent
  ],
  template: `
    <app-item-filter-panel
      (apply)="applyFilter($event)"
      (sortBy)="applySort($event)"
      (reset)="resetFilter()"
    ></app-item-filter-panel>

    <div class="pagination-container">
      <button (click)="prevPage()" [disabled]="currentPage === 1">&lt;</button>
      <span>{{translate.t('PAGINATION.PAGE')}} {{currentPage}} / {{totalPages}}</span>
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">&gt;</button>
    </div>

    <div class="items-container">
      <app-item-card
        *ngFor="let item of pagedItems"
        [item]="item"
        (sell)="openSellPopup(item)"
      ></app-item-card>
    </div>

    <div class="pagination-container bottom">
      <button (click)="prevPage()" [disabled]="currentPage === 1">&lt;</button>
      <span>{{translate.t('PAGINATION.PAGE')}} {{currentPage}} / {{totalPages}}</span>
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">&gt;</button>
    </div>

    <app-sell-popup
      *ngIf="popupItem"
      [title]="popupItem.title"
      (confirmSale)="confirmSale($event)"
      (cancelled)="popupItem = null"
    ></app-sell-popup>
  `,
  styles: [`
    .items-container { display:grid; grid-template-columns:1fr; justify-items:center; gap:20px; margin:20px 0; padding-bottom:10px; }
    @media (min-width:768px){ .items-container { grid-template-columns:repeat(2,300px); justify-content:center; gap:40px 40px; } }
    .pagination-container { display:flex; justify-content:center; align-items:center; gap:12px; margin:10px 0; }
    .pagination-container.bottom { margin-bottom:30px; }
    button { background:#333; color:#fff; border:none; padding:6px 12px; cursor:pointer; border-radius:4px; }
    button:disabled { opacity:0.4; cursor:default; }
  `]
})
export class ItemsListComponent implements OnInit {
  items: ItemDto[] = [];
  pagedItems: ItemDto[] = [];
  private apiUrl = `${environment.apiBaseUrl}/items/my`;
  itemsPerPage = 6;
  currentPage = 1;
  totalPages = 1;
  currentFilter: Partial<ItemFilter> = { sortBy: 'date_desc' };

  popupItem: ItemDto | null = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private itemFilter: ItemFilterService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.auth.token$.subscribe(token => {
      if (!token) { this.router.navigate(['/login']); return; }
      this.loadItems();
    });
  }

  private loadItems() {
    this.http.get<ItemDto[]>(this.apiUrl).subscribe({
      next: (data) => this.setItems(data),
      error: (err) => console.error('Ошибка загрузки айтемов:', err)
    });
  }

  applyFilter(filter: Partial<ItemFilter>) {
    this.currentFilter = { ...this.currentFilter, ...filter };
    this.itemFilter.filterItems(this.currentFilter).subscribe({
      next: (data) => this.setItems(data),
      error: (err) => console.error('Ошибка фильтрации айтемов:', err)
    });
  }

  applySort(sort: ItemFilter['sortBy']) {
    this.currentFilter.sortBy = sort;
    this.applyFilter(this.currentFilter);
  }

  resetFilter() {
    this.currentFilter = { sortBy: 'date_desc' };
    this.applyFilter(this.currentFilter);
  }

  private setItems(data: ItemDto[]) {
    this.items = data;
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePage();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedItems = this.items.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) { this.currentPage++; this.updatePage(); }
  }

  prevPage() {
    if (this.currentPage > 1) { this.currentPage--; this.updatePage(); }
  }

  openSellPopup(item: ItemDto) { this.popupItem = item; }

  confirmSale(price: number) {
    if (!this.popupItem) return;

    const saleDto = { itemId: this.popupItem.id, salePrice: price, saleDate: new Date().toISOString() };
    this.http.post(`${environment.apiBaseUrl}/sales`, saleDto).subscribe({
      next: () => {
        this.popupItem!.status = 'sold';
        this.popupItem = null;
        this.router.navigate(['/sale-list']);
      },
      error: (err) => console.error('Ошибка создания продажи:', err)
    });
  }
}