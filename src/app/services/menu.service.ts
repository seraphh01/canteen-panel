import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Menu, WeekDays } from '../entities/menu';
import { Food } from '../entities/food';
import { Meal } from '../entities/meal';

interface ApiResponse {
  result: Meal | Food | Menu | Menu[] | null;
  message: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService{

  private baseUrl = `${environment.baseUrl}/Menu`;

  constructor(private http: HttpClient) { }

  getMenus(): Observable<Menu[]> {
    return this.http.get<ApiResponse>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Menu[])
      );
  }

  getMenu(id: number): Observable<Menu> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Menu)
      );
  }

  getTodayMenu(): Observable<Menu> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/Today`)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Menu)
      );
  }

  updateTodayMenuQuantities(): Observable<any> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/Today`, {})
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result)
      );
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<ApiResponse>(this.baseUrl, {name: menu.Name, day_of_week: menu.DayOfWeek, open_time: menu.OpenTime, close_time: menu.CloseTime})
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Menu)
      );
  }

  addMealMenu(menuId: number, mealId: number, quantity: number = 1) : Observable<Meal> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/${menuId}/Meal/${mealId}`, {quantity: quantity})
    .pipe(
      catchError(this.handleError)
    )
    .pipe(
      map((response: ApiResponse) => response.result as Meal)
    );
  }
  
  updateMealMenu(menuId: number, mealId: number, quantity: number = 1) : Observable<Meal> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/${menuId}/Meal/${mealId}`, {quantity: quantity})
    .pipe(
      catchError(this.handleError)
    )
    .pipe(
      map((response: ApiResponse) => response.result as Meal)
    );
  }
  
  deleteMealMenu(menuId: number, mealId: number) : Observable<any> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${menuId}/Meal/${mealId}`)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  addFoodMenu(menuId: number, foodId: number, quantity: number = 1) : Observable<Food> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/${menuId}/Food/${foodId}`, {quantity: quantity})
    .pipe(
      catchError(this.handleError)
    )
    .pipe(
      map((response: ApiResponse) => response.result as Food)
    );
  }

  updateFoodMenu(menuId: number, foodId: number, quantity: number = 1) : Observable<Food> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/${menuId}/Food/${foodId}`, {quantity: quantity})
    .pipe(
      catchError(this.handleError)
    )
    .pipe(
      map((response: ApiResponse) => response.result as Food)
    );
  }

  deleteFoodMenu(menuId: number, foodId: number) : Observable<any> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${menuId}/Food/${foodId}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateMenu(menu: Menu): Observable<any> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/${menu.Id}`, { name: menu.Name, day_of_week: menu.DayOfWeek, open_time: menu.OpenTime, close_time: menu.CloseTime })
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result)
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
