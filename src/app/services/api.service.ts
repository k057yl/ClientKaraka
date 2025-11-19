import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders(
      token ? { Authorization: `Bearer ${token}` } : {}
    );
  }

  // универсальный GET
  get<T>(endpoint: string): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers });
  }

  // универсальный POST
  post<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  // ======================= Sales =======================
  createSale(data: {
    itemId: number;
    salePrice: number;
    saleDate: string;
  }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/sales`, data, { headers });
  }

  getUserSales(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/sales/my`, { headers });
  }

  // ======================= Sales filters =======================
  filterSales(filter: { sortBy?: string }): Observable<any[]> {
    const headers = this.getAuthHeaders();
    const params = new URLSearchParams();

    if (filter.sortBy) params.append('sortBy', filter.sortBy);

    return this.http.get<any[]>(`${this.baseUrl}/sales/filter?${params.toString()}`, { headers });
  }
}