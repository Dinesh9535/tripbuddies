package com.tripbuddies.controller;

import com.stripe.model.Charge;
import com.tripbuddies.client.StripeClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = { "*" })
@RequestMapping("/stripe-api/payment")
public class PaymentGatewayController {

    @Autowired
    private StripeClient stripeClient;

    @PostMapping("/charge")
    public Charge chargeCard(@RequestHeader(value="token") String token, @RequestHeader(value="amount") Double amount) throws Exception {
        System.out.println(token);
        System.out.println(amount);
        return this.stripeClient.chargeNewCard(token, amount);
    }

}
