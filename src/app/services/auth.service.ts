import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';
import { environment } from 'src/environments/environment';
import { Observable, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { clear } from 'console';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  setAccessToken(token: string): void {
    localStorage.setItem('access-token', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access-token');
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh-token', token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh-token');
  }

  clearTokens(): void {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }

  login(email: string, password: string) {
    this.clearTokens();
    return this.http.post<any>(`${environment.baseUrl}/users/authenticate/canteen`, { email, password })
        .pipe(map(res => {
            this.setAccessToken(res['access-token']);
            this.setRefreshToken(res['refresh-token']);
        }));
  }

  getEmail(){
    return this.http.post<any>(`${environment.baseUrl}/users/me`, {}).pipe(map(res => {
      return res['result'];
    }));
  }

  loginMicrosoft(){
    return this.http.get<any>(`${environment.baseUrl}/microsoft/login`, {}).pipe(map(res => {
      localStorage.setItem('access-token', res["access-token"]);
      this.router.navigate(["menus"]);
    }));
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();

    if (refreshToken) {
        const refreshUrl = `${environment.baseUrl}/refresh`;
        localStorage.setItem('access-token', refreshToken);
        return this.http.post(refreshUrl, {});
    }

    return throwError(() => new Error('No refresh token'));
}
}
