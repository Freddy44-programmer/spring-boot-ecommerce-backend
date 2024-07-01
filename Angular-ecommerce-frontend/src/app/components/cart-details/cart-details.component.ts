import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  tempCartItem: any;

constructor( private cartService: CartService){
  this.tempCartItem = { quantity: 1 };
}

  ngOnInit() {
    this.listCartDetails();
    
  }


  listCartDetails() {
  //Get a handle to the cart items
  this.cartItems = this.cartService.cartItems;


  //subcribe to the cart totalPrice
  this.cartService.totalPrice.subscribe(
    data => this.totalPrice = data
  );

  //subcribe to the cart totalQuantity
  this.cartService.totalQuantity.subscribe(
    data => this.totalQuantity = data
  );

  //compute cart total price and quantity
  this.cartService.computeCartTotals();

  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
    }


    remove(theCartItem: CartItem) {
      this.cartService.remove(theCartItem);
    }
      


    decrementQuantity(theCartItem: CartItem) {
      this.cartService.decrementQuantity(theCartItem);
  }
  
}
