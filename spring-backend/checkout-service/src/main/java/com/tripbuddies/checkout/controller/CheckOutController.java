package com.tripbuddies.checkout.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.tripbuddies.checkout.model.User;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/checkout")
public class CheckOutController {
@Value("${stripe.apiKey}")
  String apiKey;
  @PostMapping("/addUser")
  public User index(@RequestBody User user) throws StripeException {
    Stripe.apiKey = apiKey;
    Map<String,Object> params = new HashMap<>();
    params.put("name", user.getName());
    params.put("email", user.getEmailId());
    Customer customer = Customer.create(params);
    user.setUserId(customer.getId());
    return user;
  }

}
