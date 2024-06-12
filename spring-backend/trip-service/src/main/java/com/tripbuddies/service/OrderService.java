package com.tripbuddies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

import com.commercetools.api.models.cart.Cart;
import com.commercetools.api.models.cart.CartResourceIdentifierBuilder;
import com.commercetools.api.models.order.Order;
import com.commercetools.api.models.order.OrderFromCartDraft;
import com.commercetools.api.models.order.OrderFromCartDraftBuilder;
import io.vrap.rmf.base.client.ApiHttpResponse;

@Service
public class OrderService {

    @Autowired
    private TravelBuddiesConnector travelBuddiesConnector;

    public CompletableFuture<Order> placeorder(Cart cart){

        OrderFromCartDraft orderFromCartDraft = OrderFromCartDraftBuilder.of()
                .cart(CartResourceIdentifierBuilder.of().id(cart.getId()).build())
                .version(cart.getVersion())
                .build();

        return travelBuddiesConnector.getDefaultCTApi().orders()
                .post(orderFromCartDraft)
                .execute().thenApply(ApiHttpResponse::getBody);

    }

}
