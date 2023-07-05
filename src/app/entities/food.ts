import { FoodType } from "./food-type";

export interface Food {
    Id: number,
    Name: string,
    Price: number,
    Quantity: number,
    OrderedQuantity: number,
    FoodType: FoodType,
    FoodTypeId: number
}


