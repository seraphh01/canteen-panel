import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExampleComponentComponent } from './example-component/example-component.component';
import { MenusViewComponent } from './menu/menus-view/menus-view.component';
import { MenuDetailsComponent } from './menu/menu-details/menu-details.component';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from 
    '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } 
from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { FoodsViewComponent } from './food/foods-view/foods-view.component';
import { MealsViewComponent } from './meal/meals-view/meals-view.component';
import {MatSelectModule} from '@angular/material/select';
import { MenuDialogComponent } from './menu/menu-dialog/menu-dialog.component';
import { ConfirmDialogComponent } from './experience/confirm-dialog/confirm-dialog.component';
import { FoodDialogComponent } from './food/food-dialog/food-dialog.component';
import { MealDialogComponent } from './meal/meal-dialog/meal-dialog.component';
import { AlertDialogComponent } from './experience/alert-dialog/alert-dialog.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { AddFoodMenuDialogComponent } from './menu/add-food-menu-dialog/add-food-menu-dialog.component';
import { EditFoodMenuDialogComponent } from './menu/edit-food-menu-dialog/edit-food-menu-dialog.component';
import { AddMealMenuDialogComponent } from './menu/add-meal-menu-dialog/add-meal-menu-dialog.component';
import { EditMealMenuDialogComponent } from './menu/edit-meal-menu-dialog/edit-meal-menu-dialog.component';
import { AccountPanelComponent } from './account-panel/account-panel.component';
import { OrdersViewComponent } from './order/orders-view/orders-view.component';
import { environment } from 'src/environments/environment';
import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { AboutComponent } from './about/about.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponentComponent,
    MenusViewComponent,
    MenuDetailsComponent,
    LoginComponent,
    FoodsViewComponent,
    MealsViewComponent,
    MenuDialogComponent,
    ConfirmDialogComponent,
    FoodDialogComponent,
    MealDialogComponent,
    AlertDialogComponent,
    MainWindowComponent,
    AddFoodMenuDialogComponent,
    EditFoodMenuDialogComponent,
    AddMealMenuDialogComponent,
    EditMealMenuDialogComponent,
    AccountPanelComponent,
    OrdersViewComponent,
    StatisticsComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgChartsModule,
    MatSnackBarModule
      ],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }