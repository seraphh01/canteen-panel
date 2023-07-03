import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Food } from 'src/app/entities/food';
import { AlertDialogComponent } from 'src/app/experience/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/experience/confirm-dialog/confirm-dialog.component';
import { FoodService } from 'src/app/services/food.service';
import { FoodDialogComponent } from '../food-dialog/food-dialog.component';
import {AlertService }from '../../services/alert.service';
import { Pagination } from 'src/app/entities/pagination';

@Component({
  selector: 'app-foods-view',
  templateUrl: './foods-view.component.html',
  styleUrls: ['./foods-view.component.css']
})
export class FoodsViewComponent implements OnInit {
  delete = false;
  foods: Food[] = [];
  length = 110;
  foodSearchName = "";
  pagination: Pagination = {PageSize: 10, PageIndex: 0} as Pagination;

  constructor(private foodService: FoodService,
    public dialog: MatDialog, private alertService: AlertService) { }

  ngOnInit() {
    this.refreshFoods();
  }

  fetchData(data: any){
    this.foods = data.result; 
    this.pagination = data.pagination;
    this.pagination.PageIndex -= 1;
  }

  refreshFoods(){
    this.foodService.getFoods(this.pagination.PageSize, this.pagination.PageIndex+1, this.foodSearchName).subscribe((data) => {
      this.fetchData(data);
    });
  }
  
  onSearchChange(){
    this.pagination.PageIndex = 0;
    this.refreshFoods();
  }

  onPageChanged(event: PageEvent): void {
    this.pagination.PageIndex = event.pageIndex;
    this.pagination.PageSize = event.pageSize;

    this.refreshFoods();
  }

  openAddNewFoodDialog(): void {
    const dialogRef = this.dialog.open(FoodDialogComponent, {
      width: '400px',
      data: null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.foodService.addFood(result).subscribe((added) => {
          this.foods.unshift(added);
        }, (error) => {
          this.alertService.openAlertDialog("An error occured!", error);
        });
      }
    });
  }

  openEditFoodDialog(food: Food): void {
    const dialogRef = this.dialog.open(FoodDialogComponent, {
      width: '400px',
      data: food
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.foodService.updateFood(result).subscribe((result) => {
          var f = this.foods.find(f => f.Id == food.Id);
          f!.Name = result.Name;
          f!.Price = result.Price;
        }, (error) => {
          this.alertService.openAlertDialog("An error occured!", error);
        });
      }
    });
  }

  switchDelete(){
    this.delete = !this.delete;
  }

  openDeleteFoodDialog(foodId: number){
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
        this.foodService.deleteFood(foodId).subscribe(() => {
          this.foods = this.foods.filter(f => f.Id != foodId);
        }, (error) => {
          this.alertService.openAlertDialog("An error occured!", error);
        });
      }
    });
  }


}
