import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Meal } from '../entities/meal';
import { AlertService } from './alert.service';
import { Pagination } from '../entities/pagination';

export interface ApiResponse {
  result: Meal | Meal[] | null;
  message: string | null;
  pagination: Pagination;
}

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private baseUrl = `${environment.baseUrl}/Meal`;

  constructor(private http: HttpClient) { }

  getMeals(pageIndex: number = 1, pageSize: number = 10, name=""): Observable<any> {
    return this.http.get<ApiResponse>(`${this.baseUrl}?page=${pageIndex}&page_size=${pageSize}&name=${name}`)
      .pipe(
        catchError(this.handleError)
      ).pipe(map((res: ApiResponse) => res));
  }

  getMeal(id: number): Observable<Meal> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Meal)
      )
  }

  deleteMeal(id: number): Observable<any> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addMeal(meal: Meal): Observable<Meal> {
    const requestBody = {
      Name: meal.Name,
      Foods: meal.Foods.map(food => food.Id)
    };
    return this.http.post<ApiResponse>(this.baseUrl, requestBody)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Meal)
      );
  }

  updateMeal(meal: Meal): Observable<any> {
    const requestBody = {
      Name: meal.Name,
      Foods: meal.Foods.map(food => food.Id)
    };
    return this.http.put<ApiResponse>(`${this.baseUrl}/${meal.Id}`, requestBody)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Meal)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(error.error?.message ?? 'Something bad happened; please try again later.');
  };

}
