import * as internal from "stream";
import { Food } from "./food";
import { Meal } from "./meal";

export interface Order {
    Id: number;
    OrderDateTime: string;
    DoneDateTime: string;
    DeliverDateTime: string;
    OrderStatus: OrderStatus;
    OrderNumber: number;
    Foods: Food[];
    Meals: Meal[];
    Price: number;
  }

  export enum OrderStatus {
    In_Queue=0,
    Processing=1,
    Done=2,
    Waiting=3,
    Delivered=4,
    Expired=5
  }
