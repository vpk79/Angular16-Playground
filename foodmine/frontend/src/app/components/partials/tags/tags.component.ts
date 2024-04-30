import { Component } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tags?: Tag[];

  constructor(foodService: FoodService) { 
    foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }
}
