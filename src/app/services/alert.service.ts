import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../experience/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public dialog: MatDialog) { }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }
}
