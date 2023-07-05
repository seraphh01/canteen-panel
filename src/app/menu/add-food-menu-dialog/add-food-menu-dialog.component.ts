import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Food } from 'src/app/entities/food';
import { Pagination } from 'src/app/entities/pagination';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-add-food-menu-dialog',
  templateUrl: './add-food-menu-dialog.component.html',
  styleUrls: ['./add-food-menu-dialog.component.css']
})
export class AddFoodMenuDialogComponent implements OnInit {
  selectedFood! : Food | null;
  selectedFoodQuantity = 10;
  foodSearchName = "";
  pagination: Pagination = {PageIndex:0, TotalItems: 0} as Pagination;
  foods!: Food[];
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AddFoodMenuDialogComponent>, private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(res => {
      this.foods = res.result;
      this.pagination = res.pagination;
    })
  }

  openSetQuantityFoodMenuDialog(food: Food){

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
  
  onPageChanged(event: PageEvent): void {
    this.pagination.PageIndex = event.pageIndex;
    this.pagination.PageSize = event.pageSize;

    this.refreshFoods();
  }

  onSearchChange(){
    this.pagination.PageIndex = 0;
    this.refreshFoods();
  }

  foodSelected(food: Food){
    // const dialogRef = this.dialog.open(FoodQuantityMenuDialogComponent, {
    //   width: "400px",
    //   data: food
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {
        
    //     this.dialogRef.close(result);
    //   }
    // });
    if(this.selectedFood == null){
      this.selectedFood = food;
    }else if(this.selectedFood.Id == food.Id){
      this.selectedFood = null;
    } else{
      this.selectedFood = food;
    }
  }

  confirmAdd(){
    if(this.selectedFood && this.selectedFoodQuantity > 0){
      this.selectedFood.Quantity = this.selectedFoodQuantity;

      this.dialogRef.close(this.selectedFood);
    }
  }
}
