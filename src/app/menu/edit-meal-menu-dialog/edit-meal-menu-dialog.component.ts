import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Meal } from 'src/app/entities/meal';  // Be sure to replace this with the correct path to your Meal model.

@Component({
  selector: 'app-edit-meal-menu-dialog',
  templateUrl: './edit-meal-menu-dialog.component.html',
  styleUrls: ['./edit-meal-menu-dialog.component.css']
})
export class EditMealMenuDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditMealMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      Id: [data.Id],
      Name: [data.Name],
      Price: [data.Price],
      Foods: [data.Foods],
      Quantity: [data.Quantity, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  confirmDialog() {
    this.dialogRef.close(this.form.value);
  }
}
