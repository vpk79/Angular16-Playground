import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;
  constructor(cartService: CartService, userService: UserService){
    cartService.getCartObservable().subscribe((newCart)=>{
      this.cartQuantity = newCart.totalCount;
    })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }
}
