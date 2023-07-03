import { Food } from "./food";

export interface Meal{
    Id: number,
    Name: string,
    Foods: Food[],
    Price: number,
    Quantity: number,
    OrderedQuantity: number,
    AllFoods: string
}