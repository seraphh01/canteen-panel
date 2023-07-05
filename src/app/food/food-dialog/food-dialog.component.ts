import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from 'src/app/entities/food';
import { FoodType } from 'src/app/entities/food-type';

@Component({
  selector: 'app-food-dialog',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.css'],
})
export class FoodDialogComponent {
  form: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<FoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {food: Food, foodTypes: FoodType[]},
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      Id: [data.food? data.food.Id : -1],
      Name: [
        data.food ? data.food.Name : '',
        [Validators.required, Validators.minLength(2)],
      ],
      Price: [
        data.food ? data.food.Price : '',
        [Validators.required, Validators.min(1)],
      ],
      FoodTypeId: [data.food ? data.food.FoodTypeId : 0, [Validators.required]]
      
    });
  }

  getFoodName(foodTypeId: number): string{
    return this.data.foodTypes.find(f => f.Id == foodTypeId)?.Name ?? "None"; 
  }
}
