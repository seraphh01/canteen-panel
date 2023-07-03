import { Time } from "@angular/common";
import { Food } from "./food";
import { Meal } from "./meal";

export interface Menu {
    Id: number;
    Name: string;
    DayOfWeek: number;
    OpenTime: Time;
    CloseTime: Time;
    Foods: Food[];
    Meals: Meal[];
  }

export enum WeekDays {
  Monday=0,
  Tuesday=1,
  Wednesday=2,
  Thursday=3,
  Friday=4,
  Saturday=5,
  Sunday=6
}