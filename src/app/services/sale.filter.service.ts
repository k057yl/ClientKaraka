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

export interface SaleFilterResult {
  sales: SaleDto[];
  totalProfit: number;
}

@Injectable({ providedIn: 'root' })
export class SaleFilterService {
    private apiUrl = `${environment.apiBaseUrl}/salefilter`;

    constructor(private http: HttpClient, private auth: AuthService) {}

    filterSales(filter: SaleFilter = {}): Observable<SaleFilterResult> {
        let params = new HttpParams();

        for (const key in filter) {
            const value = filter[key as keyof SaleFilter]; 

            if (value !== undefined && value !== null && value !== '') {
                let stringValue = value.toString();

                if ((key === 'endDate' || key === 'startDate') && typeof value === 'string' && value.length === 10) {
                    
                    if (key === 'endDate') {
                        stringValue = `${value}T23:59:59Z`; 
                    } else {
                        stringValue = `${value}T00:00:00Z`;
                    }
                }
                
                params = params.set(key, stringValue);
            }
        }

        return this.auth.token$.pipe(
            switchMap(token => {
                if (!token) return of({ sales: [], totalProfit: 0 });

                const headers = { Authorization: `Bearer ${token}` };

                return this.http.get<SaleFilterResult>(this.apiUrl, {
                    params,
                    headers
                });
            })
        );
    }
}