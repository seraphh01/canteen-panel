import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeekDays, Menu } from 'src/app/entities/menu';



@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent implements OnInit {
  form: FormGroup;
  daysOfWeek: { [key: number]: string } = {};

  constructor(
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu | null
  ) {
    this.form = new FormGroup({
      'Name': new FormControl(data ? data.Name : null, [Validators.required]),
      'DayOfWeek': new FormControl(data ? data.DayOfWeek : null, [Validators.required]),
      'Id': new FormControl(data?.Id),
      'OpenTime': new FormControl(data?.OpenTime),
      'CloseTime': new FormControl(data?.CloseTime)
    });

    for (const key in WeekDays) {
      if (!isNaN(Number(key))) {
        this.daysOfWeek[key] = WeekDays[key];
      }
    }
  }

  ngOnInit(): void {
  }

  objectKeys(obj: object): string[] {
    return Object.keys(obj);
  }
}
