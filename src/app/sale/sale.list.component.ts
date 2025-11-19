import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SaleCardComponent, SaleDto } from '../sale/sale.card.component';
import { AuthService } from '../services/auth.service';
import { SaleFilterService, SaleFilter } from '../services/sale.filter.service';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, SaleCardComponent],
  template: `
    <div class="filters">
      <button (click)="applyFilter({ sortBy: 'profit_asc' })">Прибыль ▲</button>
      <button (click)="applyFilter({ sortBy: 'profit_desc' })">Прибыль ▼</button>
      <button (click)="applyFilter({ sortBy: 'date_desc' })">Новые</button>
      <button (click)="resetFilter()">Сбросить</button>
    </div>

    <div class="pagination-container">
      <button (click)="prevPage()" [disabled]="currentPage === 1">&lt;</button>
      <span>Страница {{currentPage}} / {{totalPages}}</span>
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">&gt;</button>
    </div>

    <div class="sales-container">
      <app-sale-card *ngFor="let sale of pagedSales" [sale]="sale"></app-sale-card>
      <p *ngIf="!pagedSales.length" class="no-sales">Продаж пока нет.</p>
    </div>

    <div class="pagination-container bottom">
      <button (click)="prevPage()" [disabled]="currentPage === 1">&lt;</button>
      <span>Страница {{currentPage}} / {{totalPages}}</span>
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">&gt;</button>
    </div>
  `,
  styles: [`
    .filters {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
    }

    .sales-container {
      display: grid;
      grid-template-columns: repeat(2, 300px);
      justify-content: center;
      gap: 20px 200px;
      margin: 20px 0;
    }

    .pagination-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin: 10px 0;
    }

    .pagination-container.bottom { margin-bottom: 30px; }

    button {
      background: #333;
      color: #fff;
      border: none;
      padding: 6px 12px;
      cursor: pointer;
      border-radius: 4px;
    }

    button:hover { background: #555; }
    button:disabled { opacity: 0.4; cursor: default; }
  `]
})
export class SalesListComponent implements OnInit {
  sales: SaleDto[] = [];
  pagedSales: SaleDto[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private auth: AuthService,
    private router: Router,
    private filterService: SaleFilterService
  ) {}

  ngOnInit() {
    this.auth.token$.subscribe(token => {
      if (!token) {
        this.router.navigate(['/login']);
        return;
      }
      this.loadSales();
    });
  }

  private loadSales() {
    this.filterService.filterSales({}).subscribe({
      next: data => this.setSales(data),
      error: err => console.error('Ошибка загрузки продаж:', err)
    });
  }

  applyFilter(filter: SaleFilter) {
    this.filterService.filterSales(filter).subscribe({
      next: data => this.setSales(data),
      error: err => console.error('Ошибка фильтрации продаж:', err)
    });
  }

  resetFilter() {
    this.loadSales();
  }

  private setSales(data: SaleDto[]) {
    this.sales = data;
    this.totalPages = Math.ceil(this.sales.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePage();
  }

  private updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedSales = this.sales.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }
}