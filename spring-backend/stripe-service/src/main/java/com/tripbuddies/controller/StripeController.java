package com.tripbuddies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import com.commercetools.api.models.cart.Cart;
import com.commercetools.api.models.payment.Payment;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripbuddies.model.stripe.Card;
import com.tripbuddies.model.stripe.PaymentModelRoot;
import com.tripbuddies.model.stripe.PaymentRequest;
import com.tripbuddies.service.CartService;
import com.tripbuddies.service.PaymentService;
import com.tripbuddies.service.StripeService;

@RestController
@RequestMapping("/stripe-api")
public class StripeController {

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private CartService cartService;
    @Autowired
    private StripeService stripeService;

    @PostMapping("/codAnon")
    public CompletableFuture<?> startCODpaymentAnon(@RequestParam String anonymousId) throws JsonProcessingException {

        CompletableFuture<Optional<Cart>> cartForAnonUser = cartService.getCartForAnonUser(anonymousId);
        return cartForAnonUser.thenApply(c -> {
            if (c.isPresent()) {
                return paymentService.addPayment("COD", anonymousId, c.get().getTaxedPrice().getTotalGross(), UUID.randomUUID().toString());
            }
            return CompletableFuture.completedFuture(null);
        }).thenCompose(m -> m);
    }

    @PostMapping("/cod")
    public CompletableFuture<?> startCODpayment(@RequestParam String customerid) throws JsonProcessingException {

        CompletableFuture<Optional<Cart>> cartForUser = cartService.getCartForUser(customerid);
        return cartForUser.thenApply(c -> {
            if (c.isPresent()) {
                return paymentService.addPayment("COD",customerid, c.get().getTaxedPrice().getTotalGross(), UUID.randomUUID().toString());
            }
            return CompletableFuture.completedFuture(null);
        }).thenCompose(e -> e);
    }

    @PostMapping("/addCard")
    public ResponseEntity<?> addCard(@RequestBody Card card) {
        String customerId = stripeService.addCard(card);
        try{
            String paymentId = stripeService.makePaymentUsingCard("card", customerId, 1200);
            PaymentRequest paymentRequest = new PaymentRequest();
            paymentRequest.setDescription("testing NK");
            paymentRequest.setSource(paymentId);
            paymentRequest.setCurrency("USD");
            paymentRequest.setAmount("1200");
            String chargeID = stripeService.charge(paymentRequest);
            return ResponseEntity.ok().body("Payment Made successfully " + chargeID);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/stripe")
    public CompletableFuture<Payment> startStripePayment(@RequestBody PaymentModelRoot paymentModel) throws JsonProcessingException {
        System.out.println("***********************************************");
        System.out.println("Testing stripeeeeeeeee");
        System.out.println("###############################################");

        CompletableFuture<Payment> paymentCF = paymentService.captureStripePayment(paymentModel);
        return paymentCF;

    }

}
