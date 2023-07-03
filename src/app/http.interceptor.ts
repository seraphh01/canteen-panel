import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    request = this.addHeaders(request);

    return next.handle(request).pipe(
      catchError(error => {
        // if (error instanceof HttpErrorResponse && error.status === 401) {
        //   return this.handle401Error(request, next);
        // } else {
        //   return throwError(() => error);
        // }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
}

private addHeaders(request: HttpRequest<any>) {
  return request.clone({
    setHeaders: {
      'Access-Controll-Allow-Origin': '*'
    }
  });
}

private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((tokens: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokens['access-token']);
          this.authService.setAccessToken(tokens['access-token']);
          this.authService.setRefreshToken(tokens['refresh-token']);
          return next.handle(this.addToken(request, tokens['access-token']));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
}
}
