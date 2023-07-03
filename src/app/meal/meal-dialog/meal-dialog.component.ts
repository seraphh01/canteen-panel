import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Food } from 'src/app/entities/food';
import { Meal } from 'src/app/entities/meal';
import { Pagination } from 'src/app/entities/pagination';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-meal-dialog',
  templateUrl: './meal-dialog.component.html',
  styleUrls: ['./meal-dialog.component.css'],
})
export class MealDialogComponent implements OnInit {
  form: FormGroup;
  foods: Food[] = [];
  selectedFoods : Food[] = [];
  pagination: Pagination = {PageIndex : 0, PageSize : 10, TotalItems : 0} as Pagination;

  constructor(
    public dialogRef: MatDialogRef<MealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal,
    private formBuilder: FormBuilder, private foodService: FoodService
  ) {
    this.form = this.formBuilder.group({
      Id: [data? data.Id : -1],
      Name: ['', Validators.required]
    });

    // this.dialogRef.beforeClosed().subscribe((value) => {
    //   if(value == null)
    //     this.dialogRef.close(null);
    //   data = this.form.value;
    //   data.Foods = this.selectedFoods;

    //   this.dialogRef.close(data);
    // });

    if(data != null)
      this.selectedFoods = data.Foods;
  }

  loadFoods(pageSize: number, pageIndex: number) {
    this.foodService.getFoods(pageSize, pageIndex+1).subscribe(res => {
      this.foods = res['result'];
      this.foods = this.foods.filter(f => this.selectedFoods.every(s => f.Id != s.Id));
      this.pagination = res['pagination'] as Pagination;
      this.pagination.PageIndex -= 1;
    });
  }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue({
        Name: this.data.Name
      });
    }

    this.loadFoods(10, 0);
  }

  addFood(food: Food){
    if(this.selectedFoods.every(f => f.Id != food.Id)){
      this.selectedFoods.unshift(food);
      this.foods = this.foods.filter(f => f.Id != food.Id);
    }
  }

  removeFood(food: Food){
    this.selectedFoods = this.selectedFoods.filter(f => f.Id != food.Id);
    this.foods.unshift(food);
  }

  confirmDialog(){
    var data = this.form.value;
    data.Foods = this.selectedFoods;
    
    return data;
  }

  getPrice() : String{
    return this.selectedFoods.map(f => f.Price).reduce((acc, cur) => acc + cur, 0).toString();
  }
}
