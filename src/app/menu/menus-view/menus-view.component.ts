import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Menu } from '../../entities/menu';
import { MenuService } from '../../services/menu.service';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { SocketService } from 'src/app/services/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-menus-view',
  templateUrl: './menus-view.component.html',
  styleUrls: ['./menus-view.component.css']
})
export class MenusViewComponent implements OnInit {
  menus: Menu[] = [];
  daysOfWeek = [
    { value: 0, display: 'Monday' },
    { value: 1, display: 'Tuesday' },
    { value: 2, display: 'Wednesday' },
    { value: 3, display: 'Thursday' },
    { value: 4, display: 'Friday' },
    { value: 5, display: 'Saturday' },
    { value: 6, display: 'Sunday' },
  ];
  length = 0;
  pageSize = 10; // set the number of items per page
  pageIndex = 0; // set the initial page index

  currentWeekDay! : number;

  constructor(private snackBar: MatSnackBar, private menuService: MenuService, public dialog: MatDialog, private alertService: AlertService, private socketService: SocketService) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe(menus => this.menus = menus);
    this.currentWeekDay = new Date(Date.now()).getDay();
    console.log(`current week day ${this.currentWeekDay}`);

    this.socketService.listen("order_alert").subscribe((res: any) => {
        this.alertService.openAlertDialog("Orders Alert", res['message']);
    });
  }

  refreshMenus(){
    this.menus = [];
    this.menuService.getMenus().subscribe(menus => this.menus = menus);
  }

  openAddMenuDialog(): void {
    const dialogRef = this.dialog.open(MenuDialogComponent, {
      width: '400px',
      data: null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.menuService.addMenu(result).subscribe(res => {
            this.menus.push(res);
          }, (error) => {
            this.alertService.openAlertDialog("An error occured: ", error);
          });
      }
    });
  }

  onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
