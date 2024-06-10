package com.tripbuddies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import com.commercetools.api.client.ByProjectKeyRequestBuilder;
import com.commercetools.api.models.cart.Cart;
import com.commercetools.api.models.cart.CartDraft;
import com.commercetools.api.models.cart.CartDraftBuilder;
import com.commercetools.api.models.cart.LineItemDraft;
import com.commercetools.api.models.cart.LineItemDraftBuilder;
import com.tripbuddies.cart.ItemToCart;
import io.vrap.rmf.base.client.ApiHttpResponse;

@Service
public class CartService {
    @Autowired
    private ByProjectKeyRequestBuilder byProjectKeyRequestBuilder;

    public CompletableFuture<Cart> addTripToCartAnonymous(ItemToCart itemToCart) {
        UUID uuid = UUID.randomUUID();
        LineItemDraft lineItemDraft = LineItemDraftBuilder.of()
                .sku(itemToCart.getSku())
                .quantity(itemToCart.getQuantity())
                .build();
        CartDraft cartDraft = CartDraftBuilder.of()
                .lineItems(lineItemDraft)
                .currency("USD")
                .country("US")
                .anonymousId(uuid.toString())
               // .customerId(id)
                .build();

        return byProjectKeyRequestBuilder.carts()
                .post(cartDraft)
                .execute().thenApply(ApiHttpResponse::getBody);
    }

}
