import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_food, sample_tags } from '../data';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[] {
    return sample_food
  }

  getAllFoodBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag == "All" ? this.getAll() : this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId: string): Food{
    return this.getAll().find(food => food.id == foodId) ?? new Food();
  }
}
