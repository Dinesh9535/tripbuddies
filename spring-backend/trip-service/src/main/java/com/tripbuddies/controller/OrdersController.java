package com.tripbuddies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import com.commercetools.api.models.cart.Cart;
import com.commercetools.api.models.payment.Payment;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripbuddies.service.CartService;
import com.tripbuddies.service.OrderService;
import com.tripbuddies.service.PaymentService;

@RestController
@RequestMapping("/orders")
public class OrdersController {
    @Autowired
    private CartService cartService;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private OrderService orderService;

    @PostMapping("/placeorderAnon")
    public CompletableFuture<CompletableFuture<?>> makeOrderAnonymous(@RequestParam String anonymousId) throws JsonProcessingException {
        CompletableFuture<Optional<Cart>> cartForUser = cartService.getCartForAnonUser(anonymousId);
        return cartForUser.thenApply(c -> {
            if (c.isPresent()) {
                return orderService.placeorder(c.get());
            }
            return CompletableFuture.completedFuture(null);
        });
    }

    @PostMapping("/placeorder")
    public CompletableFuture<CompletableFuture<?>> makeOrder(@RequestParam String customerid, @RequestParam String paymentid) throws JsonProcessingException, ExecutionException, InterruptedException {
        CompletableFuture<Optional<Cart>> cartForUser = cartService.getCartForUser(customerid);
        Payment paymentWithId = paymentService.getPaymentWithId(paymentid).get();
        return cartForUser.thenApply(c -> {
            if (c.isPresent()) {
                return cartService.setPayment(c.get(), paymentWithId)
                        .thenCompose(finalCart -> orderService.placeorder(finalCart));
            }
            return CompletableFuture.completedFuture(null);
        });
    }
}
