import { Food } from "./food";

export class CartItem {
    constructor(public food: Food) {
        this.food = food;
    }

    quantity: number = 1;
    price: number = this.food.price;
}