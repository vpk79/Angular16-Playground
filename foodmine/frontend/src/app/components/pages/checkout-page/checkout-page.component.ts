import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit{
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private FormBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let {name, address} = this.userService.currentUser
  }
}
