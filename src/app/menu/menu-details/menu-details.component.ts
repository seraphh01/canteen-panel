import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Menu } from 'src/app/entities/menu';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/experience/confirm-dialog/confirm-dialog.component';
import { MenuService } from 'src/app/services/menu.service';
import { AlertDialogComponent } from 'src/app/experience/alert-dialog/alert-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { Meal } from 'src/app/entities/meal';
import { Food } from 'src/app/entities/food';
import { FoodService } from 'src/app/services/food.service';
import { AddFoodMenuDialogComponent } from '../add-food-menu-dialog/add-food-menu-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/entities/pagination';
import { EditFoodMenuDialogComponent } from '../edit-food-menu-dialog/edit-food-menu-dialog.component';
import { AddMealMenuDialogComponent } from '../add-meal-menu-dialog/add-meal-menu-dialog.component';
import { EditMealMenuDialogComponent } from '../edit-meal-menu-dialog/edit-meal-menu-dialog.component';
import { SocketService } from 'src/app/services/socket.service';
import { Order } from 'src/app/entities/order';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {
  menuId!: number;
  menu!: Menu;
  
  foodSearchName = "";
  paginationFoods: Pagination = {PageSize: 10, PageIndex:0} as Pagination;
  deleteFoods = false;
  
  paginationMeals: Pagination = {PageSize: 10, PageIndex:0} as Pagination;
  deleteMeals = false;
  daysOfWeek = [
    { value: 0, display: 'Monday' },
    { value: 1, display: 'Tuesday' },
    { value: 2, display: 'Wednesday' },
    { value: 3, display: 'Thursday' },
    { value: 4, display: 'Friday' },
    { value: 5, display: 'Saturday' },
    { value: 6, display: 'Sunday' },
  ];
  constructor(private socketService: SocketService, private alertService: AlertService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private location: Location, private menuService: MenuService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.menuId = params['menuId'];
    });
    
    //call getMenu to menu Service
    this.menuService.getMenu(this.menuId).subscribe((menu) => {
      this.menu = menu;
    });

    this.socketService.listen("new_order").subscribe((res: Order) => {
      for(let food of res.Foods){
        var menu_food = this.menu.Foods.find(f => f.Id == food.Id);
        if(menu_food){
          menu_food.OrderedQuantity += food.Quantity;
        }
      }

      for(let meal of res.Meals){
        var menu_meal = this.menu.Meals.find(m => m.Id == meal.Id);
        if(menu_meal){
          menu_meal.OrderedQuantity += meal.Quantity;
        }
      }
    });
  }

  mealClicked(meal: Meal){
    if(this.deleteMeals){
      this.deleteMealMenu(meal);
    }else{
      this.openMealDetailsDialog(meal);
    }
  }

  openMealDetailsDialog(meal: Meal): void {
    const dialogRef = this.dialog.open(EditMealMenuDialogComponent, {
      width: '400px',
      data: meal
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.menuService.updateMealMenu(this.menuId, meal.Id, result.Quantity).subscribe(res => {
          this.menu.Meals.find(m => m.Id == meal.Id)!.Quantity = res.Quantity;
        },error => this.alertService.openAlertDialog("Error", error));

      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  addMealToMenu(): void{
    this.openAddMealToMenuDialog();
  }

  addFoodToMenu() {
    this.openAddFoodToMenuDialog();
  }

  foodClicked(food: Food){
    if(this.deleteFoods){
      this.deleteFoodMenu(food);
    }else{
      this.editFoodMenu(food);
    }
  }

  editFoodMenu(food: Food){
    this.openEditFoodMenuDialog(food);
  }

  deleteFoodMenu(food: Food) {
    this.openDeleteFoodMenuDialog(food);
  }

  deleteMealMenu(meal: Meal){
    this.openDeleteMealMenuDialog(meal);
  }

  openAddFoodToMenuDialog(){
    var dialogRef = this.dialog.open(AddFoodMenuDialogComponent, {
      width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.menuService.addFoodMenu(this.menuId, result.Id, result.Quantity).subscribe(res => {
          var foodInMenu = this.menu.Foods.find(f => f.Id == result.Id);
          
          if(foodInMenu){
            foodInMenu.Quantity += result.Quantity as number;
          }else{
            res.OrderedQuantity = 0;
            this.menu.Foods.unshift(res);
          }
        }, error => {
          this.alertService.openAlertDialog("An error occured", error)
        });
      }
    });
  }

  openAddMealToMenuDialog(){
    var dialogRef = this.dialog.open(AddMealMenuDialogComponent, {
      width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.menuService.addMealMenu(this.menuId, result.Id, result.Quantity).subscribe(res => {
          var mealInMenu = this.menu.Meals.find(f => f.Id == result.Id);
          

          if(mealInMenu){
            mealInMenu.Quantity += result.Quantity;
          }else{
            res.OrderedQuantity = 0;
            this.menu.Meals.unshift(res);
          }
        }, error => {
          this.alertService.openAlertDialog("An error occured", error)
        });
      }
    });
  }

  openEditFoodMenuDialog(food: Food){
    const dialogRef = this.dialog.open(EditFoodMenuDialogComponent, {
      
      width:'500px',
      data: food
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.menuService.updateFoodMenu(this.menuId, result.Id, result.Quantity).subscribe(res => {
          food.Quantity = res.Quantity;
        }, error => {
          this.alertService.openAlertDialog("An error occured", error)
        });
      }
    });
  }

  openDeleteFoodMenuDialog(food: Food){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'500px',
      data: {title: "Confirm delete food from menu", 
      message: `Are you sure you want to delete ${food.Name} from the menu? 
      Action can not be undone but you can add the food again afterwards.`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        //delete the food from the menu
        this.menuService.deleteFoodMenu(this.menuId, food.Id).subscribe(res => {
          this.menu.Foods = this.menu.Foods.filter(f => f.Id != food.Id);
        },
          error => {
            this.alertService.openAlertDialog("Error", error);
          });
      }
    });
  }

  openDeleteMealMenuDialog(meal: Meal){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'500px',
      data: {title: "Confirm delete meal from menu", 
      message: `Are you sure you want to delete ${meal.Name} from the menu? 
      Action can not be undone but you can add the meal again afterwards.`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        //delete the food from the menu
        this.menuService.deleteMealMenu(this.menuId, meal.Id).subscribe(res => {
          this.menu.Meals = this.menu.Meals.filter(m => m.Id != meal.Id);

          if(this.menu.Meals.length == 0){
            this.deleteMeals = false;
          }

        },
          error => {
            this.alertService.openAlertDialog("Error", error);
          });
      }
    });
  }

  openEditMenuDialog(): void {
    const dialogRef = this.dialog.open(MenuDialogComponent, {
      width: '400px',
      data: this.menu
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.menuService.updateMenu(result).subscribe((res) => {
            this.menu.Name = res.Name;
            this.menu.DayOfWeek = res.DayOfWeek;
            this.menu.OpenTime = res.OpenTime;
            this.menu.CloseTime = res.CloseTime;
          }, error => {
            this.alertService.openAlertDialog("Error", error);
          });
      }
    });
  }

  openDeleteMenuDialog(){
    const confirmDialogData: ConfirmDialogData = {
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this menu? \n\n Action can not be undone!',
    };
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: confirmDialogData,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.menuService.deleteMenu(this.menuId).subscribe(res => {
          this.router.navigate(['/menus']);
        });

      } else {
        // Cancel deletion
      }
    });
  }

  switchDeleteFoods(){
    this.deleteFoods = !this.deleteFoods;
  }

  switchDeleteMeals(){
    this.deleteMeals = !this.deleteMeals;
  }

  isMenuOfToday(){
    return (new Date(Date.now()).getDay() + 6) % 7 == this.menu.DayOfWeek;
  }
}
