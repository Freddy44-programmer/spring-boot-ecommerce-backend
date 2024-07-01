package codewithfreddy.ecommerce.dto;

import codewithfreddy.ecommerce.entity.Address;
import codewithfreddy.ecommerce.entity.Customer;
import codewithfreddy.ecommerce.entity.Order;
import codewithfreddy.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;

    private Address shippingAddress;

    private Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;

}
