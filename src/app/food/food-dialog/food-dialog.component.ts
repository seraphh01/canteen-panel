import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from 'src/app/entities/food';

@Component({
  selector: 'app-food-dialog',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.css'],
})
export class FoodDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      Id: [data? data.Id : -1],
      Name: [
        data ? data.Name : '',
        [Validators.required, Validators.minLength(2)],
      ],
      Price: [
        data ? data.Price : '',
        [Validators.required, Validators.min(1)],
      ],
    });
  }
}
