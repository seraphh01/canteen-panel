import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FoodType } from '../entities/food-type';
import { AlertDialogComponent } from '../experience/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface ApiResponse {
  result: FoodType | FoodType[] | null;
  message: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class FoodTypeService {

  private baseUrl = `${environment.baseUrl}/FoodType`;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  getFoodTypes(): Observable<FoodType[]> {
    return this.http.get<ApiResponse>(this.baseUrl)
      .pipe(
        catchError(this.handleError),
        map((response: ApiResponse) => response.result as FoodType[])
      );
  }

  getFoodType(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError),
        map((response: ApiResponse) => response)
      );
  }

  deleteFoodType(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError),
        map((response: ApiResponse) => response)
      );
  }

  addFoodType(foodType: FoodType): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, foodType)
      .pipe(
        catchError(this.handleError),
        map((response: ApiResponse) => response)
      );
  }

  updateFoodType(foodType: FoodType): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/${foodType.Id}`, foodType)
      .pipe(
        catchError(this.handleError),
        map((response: ApiResponse) => response)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
