import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
  order: Order = new Order();

  constructor(orderService: OrderService, router: Router){
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        router.navigateByUrl('/payment'); // should be /checkout
      }
    })
  }
}
