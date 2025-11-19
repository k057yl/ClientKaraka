import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SaleDto } from '../sale/sale.card.component';
import { AuthService } from './auth.service';

export interface SaleFilter {
  minProfit?: number;
  maxProfit?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: 'profit_asc' | 'profit_desc' | 'date_asc' | 'date_desc';
}

@Injectable({ providedIn: 'root' })
export class SaleFilterService {
  private apiUrl = `${environment.apiBaseUrl}/salefilter`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  filterSales(filter: SaleFilter = {}): Observable<SaleDto[]> {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value != null && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.auth.token$.pipe(
      switchMap(token => {
        if (!token) return of([]); // если нет токена, возвращаем пустой массив
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<SaleDto[]>(this.apiUrl, { params, headers });
      })
    );
  }
}