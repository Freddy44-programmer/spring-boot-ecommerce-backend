import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Province } from 'src/app/common/province';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  CreditCardMonths: number[] = [];
  CreditCardYears: number[] = [];

  countries: Country[] = [];

  shippingAddressProvinces: Province[] = [];
  billingAddressProvinces: Province[] = [];
  required: any;
 creditCardHolder: any;

  constructor(
    private formBuilder: FormBuilder,
    private ShopFormService: ShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]+$'),
        ]),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[- +()0-9]+')
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),

        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace
        ]),

        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace
        ]),

        province: new FormControl('', [Validators.required ]),

        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace
        ])
      }),

      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),

        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace
        ]),

        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace
        ]),

        province: new FormControl('', [Validators.required ]),

        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace
        ])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),

        cardHolderName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
          Validators.minLength(16),
          CustomValidators.notOnlyWhitespace
        ]),
        securityCode:new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[0-9]{3}'),
          CustomValidators.notOnlyWhitespace
        ]),
        expirationMonth: [''],
        expirationYear:['']
      })
    });

    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.ShopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.CreditCardMonths = data;
    });

    //populate credit card Years
    this.ShopFormService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved credit card years: ' + JSON.stringify(data));
      this.CreditCardYears = data;
    });

    //populate countries
    this.ShopFormService.getCountries().subscribe((data) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });


    //create the review cart method
    this.reviewCartDetails();
  }


  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    //subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  // getter methods for customer details
  get firstName() {return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() {return this.checkoutFormGroup.get('customer.email');}
  get phoneNumber() {return this.checkoutFormGroup.get('customer.phoneNumber');}


  // getter methods for shippingAddress details
  get shippingAddressCountry() {return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingAddressStreet() {return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity() {return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressProvince() {return this.checkoutFormGroup.get('shippingAddress.province');}
  get shippingAddressZipCode() {return this.checkoutFormGroup.get('shippingAddress.zipCode');}
 
  // getter methods for billingAddress details
  get billingAddressCountry() {return this.checkoutFormGroup.get('billingAddress.country');}
  get billingAddressStreet() {return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity() {return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressProvince() {return this.checkoutFormGroup.get('billingAddress.province');}
  get billingAddressZipCode() {return this.checkoutFormGroup.get('billingAddress.zipCode');}
 
    // getter methods for Credit Card details
    get creditCardType() {return this.checkoutFormGroup.get('creditCard.cardType');}
    get creditCardHolderName() {return this.checkoutFormGroup.get('creditCard.cardHolderName');}
    get creditCardNumber() {return this.checkoutFormGroup.get('creditCard.cardNumber');}
    get creditCardSecurityCode() {return this.checkoutFormGroup.get('creditCard.securityCode');}


  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    //if the current year equals the selected year, then start with current month
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.ShopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.CreditCardMonths = data;
    });
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );

      // the coping of province
      this.billingAddressProvinces = this.shippingAddressProvinces;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      // fix bug for province
      this.billingAddressProvinces = [];
    }
  }

  
  getProvinces(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.ShopFormService.getProvinces(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressProvinces = data;
      } else {
        this.billingAddressProvinces = data;
      }

      // select first province as default
      formGroup?.get('province')?.setValue(data[0]);
    });
  }


  onSubmit() {

    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
     return;
    }
       // set up order
       let order = new Order();
       order.totalPrice = this.totalPrice;
       order.totalQuantity = this.totalQuantity;
  
      //get cart items
      const cartItems = this.cartService.cartItems;
  
      //create orderItems from cartItems
      let orderItems: OrderItem[]=[];
      for (let i=0; i< cartItems.length; i++){
        orderItems[i] = new OrderItem(cartItems[i]);
      }
  
      // set up purchase
      let purchase = new Purchase();
  
  
      //populate purchase customer
     purchase.customer = this.checkoutFormGroup.controls['customer'].value;
  
      //populate purchase shipping address
      purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
      const shippingProvince: Province = JSON.parse(JSON.stringify(purchase.shippingAddress.province));
      const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
      purchase.shippingAddress.province =shippingProvince.name;
      purchase.shippingAddress.country =shippingCountry.name;
  
       //populate purchase billing address
       purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
       const billingProvince: Province = JSON.parse(JSON.stringify(purchase.billingAddress.province));
       const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
       purchase.billingAddress.province =billingProvince.name;
       purchase.billingAddress.country =billingCountry.name;
   
  
       // populate purchase order and orderItems
       purchase.order=order;
       purchase.orderItems =orderItems;
  
  
       // call REST API via the CheckoutService
       this.checkoutService.placeOrder(purchase).subscribe({
  
        next: response => {
          alert(`Your order has been received. \nOrder tracking number: ${response.orderTrackingNumber}`);
  
          // reset cart
          this.resetCart();
        },
        error: err =>{
  
          alert(`There was an error: ${err.message}`);
        }
        
  
       } )
  
    }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    //reset the form data
    this.checkoutFormGroup.reset();

    // nagivate back to products page
    this.router.navigateByUrl("/products");
  }
}

