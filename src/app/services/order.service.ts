import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Order, OrderStatus } from '../entities/order';

interface ApiResponse {
  result: Order | Order[] | null;
  message: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `${environment.baseUrl}/Order`;

  constructor(private http: HttpClient) { }

  getTodayOrders(): Observable<Order[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/Today`)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Order[])
      );
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Order)
      );
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Order[])
      );
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateOrderStatus(orderId: number, new_status: OrderStatus): Observable<any>{
    return this.http.put<ApiResponse>(`${this.baseUrl}/${orderId}`, {"order_status": new_status})
    .pipe(
      catchError(this.handleError)
    )
    .pipe(
      map((response: ApiResponse) => response.result as Order)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error.error?.message ?? 'Something bad happened; please try again later.');
  };
}
