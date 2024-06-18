package com.tripbuddies.controller;

import com.commercetools.api.models.cart.Cart;
import com.commercetools.api.models.cart.CartDraft;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Product;
import com.tripbuddies.service.CommerceToolsService;
import com.tripbuddies.service.PaymentService;
import com.tripbuddies.service.StrapiService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api")
public class CheckoutController {

  @Autowired
  private StrapiService strapiService;

  @Autowired
  private CommerceToolsService commerceToolsService;

  @Autowired
  private PaymentService paymentService;

  @GetMapping("/products")
  public Product[] getProducts() {
    return strapiService.getProducts();
  }

  @PostMapping("/checkout")
  public PaymentIntent checkout(@RequestBody CartDraft cartDraft) throws Exception {
    Cart cart = commerceToolsService.createCart(cartDraft);
    Long amount = calculateTotalAmount(cart);
    return paymentService.createPaymentIntent(amount, "usd");
  }

  private Long calculateTotalAmount(Cart cart) {
    // Implement the logic to calculate total amount from cart
    return 1000L; // example amount in cents
  }
}

