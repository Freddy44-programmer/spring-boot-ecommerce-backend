package codewithfreddy.ecommerce.service;

import codewithfreddy.ecommerce.dao.CustomerRepository;
import codewithfreddy.ecommerce.dto.Purchase;
import codewithfreddy.ecommerce.dto.PurchaseResponse;
import codewithfreddy.ecommerce.entity.Customer;
import codewithfreddy.ecommerce.entity.Order;
import codewithfreddy.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;



    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        //retrieve the order info from dto
        Order order = purchase.getOrder();

        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
         orderItems.forEach( item -> order.add(item));

        //populate order with billing and shipping Address
       order.setBillingAddress(purchase.getBillingAddress());
       order.setShippingAddress(purchase.getShippingAddress());

        //populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // save to the database
        customerRepository.save(customer);

        //return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        // generate a random UUID number(UUID version-4)
        return UUID.randomUUID().toString();
    }
}




