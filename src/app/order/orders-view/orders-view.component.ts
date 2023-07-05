import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../../entities/order';
import { OrderService } from '../../services/order.service';
import { AlertService } from 'src/app/services/alert.service';
import { SocketService } from 'src/app/services/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent implements OnInit {
  orders: Order[] = [];
  todayDate: Date = new Date(Date.now());
  getOrderStatusName(status: OrderStatus): string{
    return OrderStatus[status].toString();
  }

  constructor(private snackBar:MatSnackBar, private orderService: OrderService, private alertService: AlertService, private socketService: SocketService) { }

  ngOnInit() {
    this.refreshOrders();

    this.socketService.listen("new_order").subscribe(res => {

      this.snackBar.open(`New order was placed! Order Number #${res.OrderNumber}`, 'Close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      var new_order = res as Order;
      console.log(new_order);
      this.orders.push(new_order);
      this.sortOrders();
    });

    this.socketService.listen("order_deleted").subscribe((res: number) => {


      var order = this.orders.find(o => o.Id == res);
      if(order){
        this.snackBar.open(`Order #${order.OrderNumber} was deleted!`, 'Close', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.orders = this.orders.filter(o => o.Id != res);
      }
    });

    this.socketService.listen("order_status_updated").subscribe((res: Order) => {
      var order = this.orders.find(o => o.Id == res.Id);
      if(order){

        order.OrderStatus = res.OrderStatus;

        if(order.OrderStatus == OrderStatus.Waiting)
          {
            this.snackBar.open(`Please confirm order #${order.OrderNumber} was picked!`, 'Close', {
              duration: 0,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }  

        this.sortOrders();
      }
    });
  }

  sortOrders(){
    this.orders = this.orders.sort((a, b) => a.OrderStatus - b.OrderStatus);
  }

  refreshOrders(){
    this.orders = [];
    this.orderService.getTodayOrders().subscribe(orders => {
      this.orders = orders.filter(o => o.OrderStatus != OrderStatus.Delivered);
    });
  }

  deleteOrder(orderId: number){
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.Id !== orderId);
    }, (error) => {
      this.alertService.openAlertDialog("An error occurred: ", error);
    });
  }

  updateOrderStatus(order: Order) {
    if(order.OrderStatus == OrderStatus.Delivered){
      return;
    }
    
    this.orderService.updateOrderStatus(order.Id, (order.OrderStatus + 1) % 6).subscribe(res => {
      order.OrderStatus = res.OrderStatus;
      this.sortOrders();
    });
  }

  cancelProcessing(order: Order){
    this.orderService.updateOrderStatus(order.Id, OrderStatus.In_Queue).subscribe(res => {
      order.OrderStatus = res.OrderStatus;
      this.sortOrders();
    });
  }

  doneOrder(order: Order){
    this.orderService.updateOrderStatus(order.Id, OrderStatus.Done).subscribe(res => {
      order.OrderStatus = res.OrderStatus;
      this.sortOrders();
    });
  }

  getStatusColor(order: Order): string {
    switch(order.OrderStatus) {
      case OrderStatus.In_Queue:return "gray";
      case OrderStatus.Processing:return "orange";
      case OrderStatus.Waiting: return "lightgreen";
      case OrderStatus.Done:return "lightgreen";
      case OrderStatus.Delivered:return "green";
      case OrderStatus.Expired:return "red";
    }
  }

  getStatusBorder(order:Order): string {
    if(order.OrderStatus == OrderStatus.Waiting){
      return "5px solid red";
    }

    return "none";
  }

  isDone(order: Order): boolean {
    return order.OrderStatus == OrderStatus.Done;
  }

  clientConfirmed(order: Order) : boolean{
    return order.OrderStatus == OrderStatus.Waiting;
  }

  getProcessingOrders() {
    return this.orders.filter(o => o.OrderStatus == OrderStatus.Processing);
  }
}
