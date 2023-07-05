import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Meal } from 'src/app/entities/meal';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/experience/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { MealService } from 'src/app/services/meal.service';
import { MealDialogComponent } from '../meal-dialog/meal-dialog.component';
import { Pagination } from 'src/app/entities/pagination';

@Component({
  selector: 'app-meals-view',
  templateUrl: './meals-view.component.html',
  styleUrls: ['./meals-view.component.css']
})
export class MealsViewComponent implements OnInit {
  delete= false;
  mealSearchName="";
  meals: Meal[] = [];
  pagination: Pagination = {PageIndex: 0, PageSize:10, TotalItems:0} as Pagination;

  constructor(private mealService: MealService, public dialog: MatDialog, private alertService: AlertService) { }

  ngOnInit() {
    this.refreshMeals();
  }

  refreshMeals(){
    this.meals = [];
    this.mealService.getMeals(this.pagination.PageIndex+1, this.pagination.PageSize, this.mealSearchName).subscribe(data => this.fetchData(data), (error) => {
      this.alertService.openAlertDialog("An error occured!", error);
    });
  }

  fetchData(data: any){
    this.meals = data.result as Meal[];
    this.pagination = data.pagination;
    this.pagination.PageIndex -= 1;
  }

  openAddNewMealDialog(){
    const dialogRef = this.dialog.open(MealDialogComponent, {
      width: '500px',
      data: null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mealService.addMeal(result).subscribe((meal) => {
          this.meals.unshift(meal);
          this.pagination.TotalItems += 1;
        }, (error) => {
          this.alertService.openAlertDialog("An error occured!", error);
        });
      } 
    });
  }

  openEditMealDialog(meal: Meal){
    this.mealService.getMeal(meal.Id).subscribe(res => {
      const dialogRef = this.dialog.open(MealDialogComponent, {
        width: '500px',
        data: res
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.mealService.updateMeal(result).subscribe((meal) => {
            var m = this.meals.find(m => m.Id == meal.Id);
            m!.Name = meal.Name;
            m!.Price = meal.Price;
          }, (error) => {
            this.alertService.openAlertDialog("An error occured!", error);
          });
        }
      });
    });

    
  }

  openDeleteMealDialog(mealId: number){
    const confirmDialogData: ConfirmDialogData = {
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
    };
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: confirmDialogData,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mealService.deleteMeal(mealId).subscribe(() => {
          this.meals = this.meals.filter(m => m.Id != mealId);
        }, (error) => {
          this.alertService.openAlertDialog("An error occured!", error);
        });
      }
    });
  }

  onPageChanged(event: PageEvent): void {
    this.pagination.PageIndex = event.pageIndex;
    this.pagination.PageSize = event.pageSize;

    this.refreshMeals();
  }

  switchDelete(){
    this.delete = !this.delete;
  }

  onSearchChange(){
    this.pagination.PageIndex = 0;
    this.refreshMeals();
  }
}
