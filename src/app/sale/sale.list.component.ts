import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SaleCardComponent, SaleDto } from '../sale/sale.card.component';
import { AuthService } from '../services/auth.service';
import { SaleFilterService, SaleFilter } from '../services/sale.filter.service';
import { SaleFilterPanelComponent } from './sale-filter-panel.component';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SaleCardComponent, SaleFilterPanelComponent],
  template: `
    <app-sale-filter-panel
      (apply)="applyCurrentFilter($event)"
      (sortBy)="currentSortBy = $event"
      (reset)="resetFilter()"
    ></app-sale-filter-panel>

    <p class="total-profit" *ngIf="totalProfit !== null">
      {{translate.t("SHARED.TOTAL_PROFIT")}} {{ totalProfit | number:'1.2-2' }}
    </p>

    <div class="pagination-container">
      <button (click)="prevPage()" [disabled]="currentPage===1"><</button>
      <span>{{translate.t('PAGINATION.PAGE')}} {{currentPage}} / {{totalPages}}</span>
      <button (click)="nextPage()" [disabled]="currentPage===totalPages">></button>
    </div>

    <div class="sales-container">
      <app-sale-card *ngFor="let sale of pagedSales" [sale]="sale"></app-sale-card>
      <p *ngIf="!pagedSales.length" class="no-sales">{{translate.t("SHARED.NO_SALES")}}</p>
    </div>

    <div class="pagination-container bottom">
      <button (click)="prevPage()" [disabled]="currentPage===1"><</button>
      <span>{{translate.t('PAGINATION.PAGE')}} {{currentPage}} / {{totalPages}}</span>
      <button (click)="nextPage()" [disabled]="currentPage===totalPages">></button>
    </div>
  `,
  styles: [`
    .sales-container { display:grid; grid-template-columns:1fr; justify-items:center; gap:20px; margin:20px 0; padding-bottom:10px; }
    @media(min-width:768px){ .sales-container { grid-template-columns:repeat(2,300px); justify-content:center; gap:40px 40px; } }
    .pagination-container{ display:flex; justify-content:center; align-items:center; gap:12px; margin:10px 0; }
    .pagination-container.bottom{ margin-bottom:30px; }
    button{ background:#333; color:#fff; border:none; padding:6px 12px; cursor:pointer; border-radius:4px; }
    button:disabled{ opacity:.4; cursor:default; }
    .total-profit{ font-size:20px; color:#28a745; font-weight:bold; margin-top:10px; text-align:center; }
  `]
})
export class SalesListComponent implements OnInit {
  sales: SaleDto[] = [];
  pagedSales: SaleDto[] = [];
  totalProfit: number = 0;

  startDate?: string;
  endDate?: string;
  minProfit?: number;
  maxProfit?: number;
  currentSortBy: SaleFilter['sortBy'] = 'date_desc';

  itemsPerPage = 6;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private auth: AuthService,
    private router: Router,
    private filterService: SaleFilterService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.auth.token$.subscribe(token => {
      if (!token) this.router.navigate(['/login']);
      else this.applyCurrentFilter();
    });
  }

  applyCurrentFilter(filter?: Partial<SaleFilter>) {
    if (filter) {
      this.startDate = filter.startDate;
      this.endDate = filter.endDate;
      this.minProfit = filter.minProfit;
      this.maxProfit = filter.maxProfit;
      if (filter.sortBy) this.currentSortBy = filter.sortBy;
    }

    const f: SaleFilter = {
      startDate: this.startDate,
      endDate: this.endDate,
      minProfit: this.minProfit,
      maxProfit: this.maxProfit,
      sortBy: this.currentSortBy
    };

    this.filterService.filterSales(f).subscribe({
      next: data => this.setSales(data.sales, data.totalProfit),
      error: err => console.error(err)
    });
  }

  resetFilter() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.minProfit = undefined;
    this.maxProfit = undefined;
    this.currentSortBy = 'date_desc';
    this.applyCurrentFilter();
  }

  private setSales(sales: SaleDto[], profit: number) {
    this.sales = sales;
    this.totalProfit = profit;
    this.totalPages = Math.ceil(this.sales.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePage();
  }

  private updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedSales = this.sales.slice(start, start + this.itemsPerPage);
  }

  nextPage() { if(this.currentPage<this.totalPages){ this.currentPage++; this.updatePage(); } }
  prevPage() { if(this.currentPage>1){ this.currentPage--; this.updatePage(); } }
}