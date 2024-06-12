package com.tripbuddies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import com.commercetools.api.models.cart.Cart;
import com.commercetools.api.models.cart.CartAddPaymentAction;
import com.commercetools.api.models.cart.CartAddPaymentActionBuilder;
import com.commercetools.api.models.cart.CartDraft;
import com.commercetools.api.models.cart.CartDraftBuilder;
import com.commercetools.api.models.cart.CartState;
import com.commercetools.api.models.cart.CartUpdate;
import com.commercetools.api.models.cart.CartUpdateBuilder;
import com.commercetools.api.models.cart.LineItemDraft;
import com.commercetools.api.models.cart.LineItemDraftBuilder;
import com.commercetools.api.models.payment.Payment;
import com.commercetools.api.models.payment.PaymentResourceIdentifierBuilder;
import com.commercetools.api.models.product.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.vrap.rmf.base.client.ApiHttpResponse;

@Service
public class CartService {
    @Autowired
    private TravelBuddiesConnector travelBuddiesConnector;

    public Product getProductByKey(String productKey) {
        Product product = travelBuddiesConnector.getDefaultCTApi().products().withKey(productKey).get().executeBlocking()
                .getBody();
        return product;
    }

    public CompletableFuture<Cart> addTripToCartAnonymous(Product product) {
        UUID uuid = UUID.randomUUID();

        LineItemDraft lineItemDraft = LineItemDraftBuilder.of()
                .productId(getProductByKey(product.getKey()).getId())
                .quantity(1L)
                .build();
        CartDraft cartDraft = CartDraftBuilder.of()
                .lineItems(lineItemDraft)
                .currency("INR")
                .country("IN")
                .anonymousId(uuid.toString())
                //.customerId(id)
                .build();

        return travelBuddiesConnector.getDefaultCTApi().carts()
                .post(cartDraft)
                .execute().thenApply(ApiHttpResponse::getBody);
    }
    public CompletableFuture<Optional<Cart>> getCartForAnonUser(String id) throws JsonProcessingException {

        return travelBuddiesConnector.getDefaultCTApi().carts()
                .get()
                .withWhere("anonymousId = \"" + id + "\"" + "and cartState = \"" + CartState.CartStateEnum.ACTIVE + "\"")
                .withLimit(1)
                .execute().thenApply(ApiHttpResponse::getBody).thenApply(e -> e.getResults().stream().findFirst());
    }

    public CompletableFuture<Optional<Cart>> getCartForUser(String id) throws JsonProcessingException {

        return travelBuddiesConnector.getDefaultCTApi().carts()
                .get()
                .withWhere("customerId = \"" + id + "\"" + "and cartState = \"" + CartState.CartStateEnum.ACTIVE + "\"")
                .withLimit(1)
                .execute().thenApply(ApiHttpResponse::getBody).thenApply(e -> e.getResults().stream().findFirst());
    }

    public CompletableFuture<Cart> setPayment(Cart cart, Payment payment) {
        final CartAddPaymentAction cartUpdateAction = CartAddPaymentActionBuilder.of()
                .payment(PaymentResourceIdentifierBuilder.of()
                        .id(payment.getId()).build())
                .build();

        CartUpdate cartUpdate = CartUpdateBuilder.of()
                .version(cart.getVersion())
                .actions(cartUpdateAction)
                .build();

        return travelBuddiesConnector.getDefaultCTApi().carts()
                .withId(cart.getId())
                .post(cartUpdate)
                .execute().thenApply(ApiHttpResponse::getBody);
    }



}
