import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Food } from '../entities/food';
import { AlertDialogComponent } from '../experience/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Pagination } from '../entities/pagination';
import { FoodType } from '../entities/food-type';


interface ApiResponse {
  result: Food | Food[] | null;
  message: string | null;
  pagination: Pagination;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private baseUrl = `${environment.baseUrl}/Food`;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  getFoods(pageSize: number | null = 10, pageNumber: number |null = 1, name: String | null = ""): Observable<any> {
    
    return this.http.get<ApiResponse>(`${this.baseUrl}?per_page=${pageSize}&page=${pageNumber}&name=${name}`)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response)
      );
  }

  getFood(id: number): Observable<Food> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Food)
      );
  }



  deleteFood(id: number): Observable<any> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addFood(food: Food): Observable<Food> {
    const requestBody = {
      name: food.Name,
      price: food.Price,
      food_type_id: food.FoodTypeId
    };

    return this.http.post<ApiResponse>(this.baseUrl, requestBody)
      .pipe(
        catchError(this.handleError)
      )
      .pipe(
        map((response: ApiResponse) => response.result as Food)
      );
  }

  updateFood(food: Food): Observable<any> {
    const requestBody = {
      name: food.Name,
      price: food.Price,
      food_type_id: food.FoodTypeId
    };
    return this.http.put<ApiResponse>(`${this.baseUrl}/${food.Id}`, requestBody)
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
      console.error(error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error ?? 'Something bad happened; please try again later.');
  };
}
