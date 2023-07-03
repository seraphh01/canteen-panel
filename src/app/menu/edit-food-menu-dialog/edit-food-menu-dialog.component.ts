import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Food } from 'src/app/entities/food';

@Component({
  selector: 'app-edit-food-menu-dialog',
  templateUrl: './edit-food-menu-dialog.component.html',
  styleUrls: ['./edit-food-menu-dialog.component.css']
})
export class EditFoodMenuDialogComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditFoodMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food, private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        Id: [data.Id],
        Name: [data.Name],
        Quantity: [data.Quantity, [Validators.required, Validators.min(1)]]
      });
    }

  ngOnInit(): void {
  
  }

  confirmDialog(){
    this.dialogRef.close(this.form.value);
  }
}
