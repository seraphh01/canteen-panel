import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ExampleComponentComponent as ExampleComponent } from './example-component/example-component.component';
import { FoodsViewComponent } from './food/foods-view/foods-view.component';
import { LoginComponent } from './login/login.component';
import { MealsViewComponent } from './meal/meals-view/meals-view.component';
import { MenuDetailsComponent } from './menu/menu-details/menu-details.component';
import { MenusViewComponent } from './menu/menus-view/menus-view.component';
import { AccountPanelComponent } from './account-panel/account-panel.component';
import { OrdersViewComponent } from './order/orders-view/orders-view.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {path: 'microsoft/login',
component: AppComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'menus',
    component: MenusViewComponent,
  },
  {
    path:'meals',
    component: MealsViewComponent
  },
  {
    path:'foods',
    component: FoodsViewComponent
  },
  {
    path: 'orders',
    component: OrdersViewComponent,
  },{
    path: 'orders/:orderId',
    component: MenuDetailsComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },  {
    path: 'about',
    component: AboutComponent,
  },  {
    path: 'contact',
    component: ExampleComponent,
  },  {
    path: 'menus/:menuId',
    component: MenuDetailsComponent,
  },{
    path: 'account',
    component: AccountPanelComponent,
  },
  {
    path: '**',
    redirectTo: '/menus',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }