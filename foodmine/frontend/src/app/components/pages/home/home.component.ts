import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  foods: Food[] = [];

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      let foodObservable: Observable<Food[]>;
      if (params.searchTerm) {
        foodObservable = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
      } else if (params.tag) {
        foodObservable = this.foodService.getAllFoodsByTag(params.tag)
      }
      else {
        foodObservable = foodService.getAll();
      }

      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    })
  }
}
