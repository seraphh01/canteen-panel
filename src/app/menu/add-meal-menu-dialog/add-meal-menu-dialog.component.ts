import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Meal } from 'src/app/entities/meal';
import { Pagination } from 'src/app/entities/pagination';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-add-meal-menu-dialog',
  templateUrl: './add-meal-menu-dialog.component.html',
  styleUrls: ['./add-meal-menu-dialog.component.css']
})
export class AddMealMenuDialogComponent implements OnInit {

  selectedMeal! : Meal | null;
  selectedMealQuantity = 10;
  mealSearchName = "";
  pagination: Pagination = {PageIndex:0, TotalItems: 0, PageSize:10} as Pagination;
  meals!: Meal[];
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AddMealMenuDialogComponent>, private mealService: MealService) { }

  ngOnInit(): void {
    this.refreshMeals();
  }

  fetchData(data: any){
    this.meals = data.result; 
    this.pagination = data.pagination;
    this.pagination.PageIndex -= 1;
  }

  refreshMeals(){
    this.mealService.getMeals(this.pagination.PageIndex+1, this.pagination.PageSize, this.mealSearchName).subscribe((data) => {
      this.fetchData(data);
    });
  }
  
  onPageChanged(event: PageEvent): void {
    this.pagination.PageIndex = event.pageIndex;
    this.pagination.PageSize = event.pageSize;

    this.refreshMeals();
  }

  onSearchChange(){
    this.pagination.PageIndex = 0;
    this.refreshMeals();
  }

  mealSelected(meal: Meal){
    if(this.selectedMeal == null){
      this.selectedMeal = meal;
    }else if(this.selectedMeal.Id == meal.Id){
      this.selectedMeal = null;
    } else{
      this.selectedMeal = meal;
    }
  }

  confirmAdd(){
    if(this.selectedMeal && this.selectedMealQuantity > 0){
      this.selectedMeal.Quantity = this.selectedMealQuantity;

      this.dialogRef.close(this.selectedMeal);
    }
  }

}
