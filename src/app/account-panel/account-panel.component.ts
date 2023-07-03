import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../experience/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.css']
})
export class AccountPanelComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showConfirmLogout(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'500px',
      data: {title: "Confirm logout", 
      message: `Are you sure you want to logout? You will have to login again after this`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        localStorage.clear();
        window.location.reload();
      }
    });
  }
}
