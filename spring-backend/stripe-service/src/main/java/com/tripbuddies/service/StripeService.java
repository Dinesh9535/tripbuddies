package com.tripbuddies.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.tripbuddies.model.stripe.Card;
import com.tripbuddies.model.stripe.PaymentRequest;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class StripeService {

    private Stripe stripe;

    @Value("${stripe.apiKey}")
    private String secretKey;

    @PostConstruct
    public void init() {
        stripe.apiKey = secretKey;
    }

    public String addCard(Card card) {
        Stripe.apiKey = secretKey;

        Map<String, Object> cardParams = new HashMap<>();
        cardParams.put("number", card.getCardNumber());
        cardParams.put("exp_month", card.getExpirationMonth());
        cardParams.put("exp_year", card.getExpirationYear());
        cardParams.put("cvc", card.getCvc());

        Map<String, Object> paymentMethodParams = new HashMap<>();
        paymentMethodParams.put("type", "card");
        paymentMethodParams.put("card", cardParams);

        try {
            PaymentMethod paymentMethod = PaymentMethod.create(paymentMethodParams);

            Map<String, Object> customerParams = new HashMap<>();
            customerParams.put("email", card.getEmail());
            customerParams.put("payment_method", "card");

            CustomerCreateParams params =
                    CustomerCreateParams.builder()
                            .setName("test")
                            .setEmail(card.getEmail())
                            .setPaymentMethod("card")
                            .build();
            Customer customer = Customer.create(params);

            //Customer customer = Customer.create(customerParams);

            return customer.getId();
        } catch (StripeException e) {
            return "Error: " + e.getMessage();
        }
    }

    public String makePaymentUsingCard(String paymentMethodId, String customerId, long amount) {
        Stripe.apiKey = secretKey;

        try {
            Customer customer = Customer.retrieve(customerId);

            PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                    .setAmount(amount)
                    .setCurrency("usd")
                    .setPaymentMethod(paymentMethodId)
                    .setCustomer(customerId)
                    .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.AUTOMATIC)
                    .setConfirm(true)
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(createParams);

            return paymentIntent.getId();
        } catch (StripeException e) {
            return "Error: " + e.getMessage();
        }
    }

    public String charge(PaymentRequest paymentRequest) {
        Stripe.apiKey = secretKey;

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", paymentRequest.getAmount());
        chargeParams.put("currency", paymentRequest.getCurrency());
        chargeParams.put("description", paymentRequest.getDescription());
        chargeParams.put("source", secretKey);

        try {
            Charge charge = Charge.create(chargeParams);

            return charge.getId();
        } catch (StripeException e) {
            return "Error: " + e.getMessage();
        }
    }

    public String createPaymentIntent() throws StripeException {
        Stripe.apiKey = secretKey;
        List<Object> paymentMethodTypes =
                new ArrayList<>();
        paymentMethodTypes.add("card");
        Map<String, Object> params = new HashMap<>();
        params.put("amount", 1200);
        params.put("currency", "INR");
                params.put(
                        "payment_method_types",
                        paymentMethodTypes
                );

        PaymentIntent paymentIntent =
                PaymentIntent.create(params);

        Map<String, Object> params2 = new HashMap<>();
        params.put("payment_method", "pm_card_visa");

        PaymentIntent updatedPaymentIntent =
                paymentIntent.confirm(params2);
        return  updatedPaymentIntent.getId();
    }
}
