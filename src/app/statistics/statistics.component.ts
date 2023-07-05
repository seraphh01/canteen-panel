import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from 'src/app/entities/order';
import { OrderService } from 'src/app/services/order.service';
import { DatePipe } from '@angular/common';
import { ChartDataset } from 'chart.js';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  allOrders: Order[] = [];
  currentDayOrders: Order[] = [];
  currentWeekOrders: Order[] = [];
  lastWeekOrders: Order[] = [];
  allTimeOrders: Order[] = [];
  averageDeliveryTimes: { [key: string]: number } = {};
  
 
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
     title: {
      text:"Average orders per hour",
      display: true
     }
  };
  public barChartLabels = Array.from(Array(24).keys()).map(String);
  public barChartType = 'bar';
  public barChartLegend = true;
  
  public barChartData: ChartDataset[] = [
  ];
  
  lineChartLabels: string[] = []; // will hold dates as strings
lineChartData: ChartDataset[] = [
  { data: [], label: 'Orders' } // will hold number of orders
];

lineChartOptions = {
  responsive: true,
};


lineChartLegend = true;
lineChartType = 'line';
lineChartPlugins = [];


  constructor(private orderService: OrderService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      this.allOrders = orders;

      const now = new Date();
      const today = this.datePipe.transform(now, 'yyyy-MM-dd') as string;
      this.currentDayOrders = this.allOrders.filter(order => this.datePipe.transform(order.OrderDateTime, 'yyyy-MM-dd') === today);

      // Filter for current week orders
      const startOfWeek = this.getStartOfWeek(now);
      const endOfWeek = this.getEndOfWeek(now);
      this.currentWeekOrders = this.allOrders.filter(order => {
        const orderDate = new Date(order.OrderDateTime);
        return orderDate >= startOfWeek && orderDate <= endOfWeek;
      });

      // Filter for last week orders
      const startOfLastWeek = this.getStartOfWeek(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7));
      const endOfLastWeek = this.getEndOfWeek(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7));
      this.lastWeekOrders = this.allOrders.filter(order => {
        const orderDate = new Date(order.OrderDateTime);
        return orderDate >= startOfLastWeek && orderDate <= endOfLastWeek;
      });

      // All time orders
      this.allTimeOrders = this.allOrders;

      // Calculate average delivery time for all categories
      this.averageDeliveryTimes['today'] = this.calculateAverageDeliveryTime(this.currentDayOrders);
      this.averageDeliveryTimes['currentWeek'] = this.calculateAverageDeliveryTime(this.currentWeekOrders);
      this.averageDeliveryTimes['lastWeek'] = this.calculateAverageDeliveryTime(this.lastWeekOrders);
      this.averageDeliveryTimes['allTime'] = this.calculateAverageDeliveryTime(this.allTimeOrders);

      this.barChartData = [
        {data: this.calculateAverageOrdersPerHour(this.currentWeekOrders), label: 'Current Week'},
        {data: this.calculateAverageOrdersPerHour(this.lastWeekOrders), label: 'Last Week'},
        {data: this.calculateAverageOrdersPerHour(this.allTimeOrders), label: 'All Time'}
      ];
    
      let dateCounts = this.getOrdersLast30Days(orders);

      // Sort the dates in ascending order
      const sortedDates = Object.keys(dateCounts).sort();
  
      // Convert dateCounts object to arrays for line chart labels and data
      this.lineChartLabels = sortedDates;
    this.lineChartData[0].data = sortedDates.map(date => dateCounts[date]);
    });
  }

  private getStartOfWeek(date: Date) {
    const diff = date.getDate() - date.getDay(); // adjust when day is sunday
    return new Date(date.setDate(diff));
  }

  private getEndOfWeek(date: Date) {
    const startOfWeek = this.getStartOfWeek(date);
    return new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6); // Add 6 days to start of week to get end of week
  }

  calculateAverageDeliveryTime(orders: Order[]): number {
    let totalDeliveryTime = 0;
    
    // Filter out orders that are not delivered
    const deliveredOrders = orders.filter(order => order.OrderStatus == OrderStatus.Delivered);

    if(deliveredOrders.length > 0){
      deliveredOrders.forEach(order => {
        const orderDate = new Date(order.OrderDateTime);
        const deliveryDate = new Date(order.DeliverDateTime);
        const deliveryTime = Math.abs(deliveryDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
        totalDeliveryTime += deliveryTime;
      });

      return totalDeliveryTime / deliveredOrders.length;
    }

    // In case there are no delivered orders, return 0
    return 0;
  }

  formatTime(timeInHours: number): string {
    const hours = Math.floor(timeInHours);
    const minutes = Math.floor((timeInHours * 60) % 60);
    const seconds = Math.floor((timeInHours * 3600) % 60);

    if(hours == 0){
      return `${minutes} minutes ${seconds} seconds`
    }

    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  }

  calculateAverageOrdersPerHour(orders: Order[]): number[] {
    let hourlyOrders = new Array(24).fill(0);
    let hourlyOrderCounts = new Array(24).fill(0);
    
    orders.forEach(order => {
      const orderDate = new Date(order.OrderDateTime);
      const hour = orderDate.getHours();
      hourlyOrders[hour]++;
      hourlyOrderCounts[orderDate.getDay()] = true;  // mark this day as having orders
    });

    const numberOfDays = hourlyOrderCounts.filter(Boolean).length;  // count number of days with orders
  
    for (let i = 0; i < 24; i++) {
      hourlyOrders[i] = hourlyOrders[i] / numberOfDays || 0;  // avoid division by 0
    }
  
    return hourlyOrders;
  }
  
  // Function to get counts of orders for each day over the last 30 days
  getOrdersLast30Days(orders: Order[]): { [date: string]: number } {
    let dateCounts = this.initializeLast30Days();
  
    orders.forEach(order => {
      const orderDate = new Date(order.OrderDateTime);
      const dateString = orderDate.toISOString().split('T')[0]; // get date as 'YYYY-MM-DD'
      if (dateString in dateCounts) {
        dateCounts[dateString]++;
      }
    });
  
    return dateCounts;
  }
  

initializeLast30Days(): { [date: string]: number } {
  let dateCounts: { [date: string]: number } = {};
  for (let i = 0; i < 30; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0]; // get date as 'YYYY-MM-DD'
    dateCounts[dateString] = 0;
  }
  return dateCounts;
}


}
