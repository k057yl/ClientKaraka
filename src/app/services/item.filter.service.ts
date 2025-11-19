import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ItemDto } from '../item/item.card.component';

export interface ItemFilter {
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class ItemFilterService {
  private apiUrl = `${environment.apiBaseUrl}/itemfilter`;

  constructor(private http: HttpClient) {}

  filterItems(filter: ItemFilter): Observable<ItemDto[]> {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '')
        params = params.set(key, value.toString());
    });
    return this.http.get<ItemDto[]>(this.apiUrl, { params });
  }
}