package codewithfreddy.ecommerce.service;

import codewithfreddy.ecommerce.dto.Purchase;
import codewithfreddy.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
