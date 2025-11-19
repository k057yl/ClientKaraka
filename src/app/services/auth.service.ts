import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ItemCreateDto {
  Title: string;
  Description?: string;
  PurchasePrice: number;
  PurchaseDate: string;
  CategoryId: number;
  PhotoUrl?: string;
}

export interface AppUser {
  id: string;
  email: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  private userSubject = new BehaviorSubject<AppUser | null>(null);
  user$ = this.userSubject.asObservable();

  private pendingEmail: string | null = null;
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  private itemsUrl = `${environment.apiBaseUrl}/items/create`;

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.loadUserFromToken(token);
    }
  }

  // ======================= Auth =======================
  register(email: string, username: string, password: string) {
    this.pendingEmail = email;
    return this.http.post(`${this.apiUrl}/register`, { email, username, password });
  }

  getPendingEmail(): string {
    return this.pendingEmail ?? '';
  }

  confirmEmail(code: string) {
    const email = this.getPendingEmail();
    return this.http.post(`${this.apiUrl}/confirm-email`, { email, code });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        this.saveToken(res.token);

        const payload = JSON.parse(atob(res.token.split('.')[1]));
        const roles = payload?.roles || [];

        const user: AppUser = { ...res.user, roles };
        
        // пушим сразу в userSubject
        this.setUser(user);
      })
    );
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
    this.tokenSubject.next(token);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.tokenSubject.next(null);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  setUser(user: AppUser) {
    this.userSubject.next(user);
  }

  // ======================= Восстановление пользователя =======================
  private loadUserFromToken(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload?.roles || [];
      this.userSubject.next({
        id: payload.sub || '',
        email: payload.email || '',
        roles
      });
      this.tokenSubject.next(token);
    } catch {
      this.logout(); // если токен битый
    }
  }

  // ======================= Current User =======================
  getCurrentUser(): Observable<AppUser> {
    const token = this.getToken();
    if (!token) throw new Error('User is not authenticated');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ email: string; roles: string[] }>(`${this.apiUrl}/me`, { headers })
      .pipe(
        tap((user: any) => {
          this.userSubject.next({
            id: user.id ?? '',
            email: user.email,
            roles: user.roles ?? []
          });
        })
      );
  }

  // ======================= Items =======================
  createItem(dto: ItemCreateDto): Observable<any> {
    const token = this.getToken();
    if (!token) throw new Error('User is not authenticated');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(this.itemsUrl, dto, { headers });
  }
}