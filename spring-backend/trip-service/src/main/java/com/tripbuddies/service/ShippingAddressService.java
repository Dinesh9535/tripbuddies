package com.tripbuddies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

import com.commercetools.api.models.cart.Cart;
import com.commercetools.api.models.cart.CartSetShippingAddressAction;
import com.commercetools.api.models.cart.CartSetShippingAddressActionBuilder;
import com.commercetools.api.models.cart.CartUpdate;
import com.commercetools.api.models.cart.CartUpdateBuilder;
import com.commercetools.api.models.common.AddressBuilder;
import com.tripbuddies.model.customer.CustomerAddress;
import io.vrap.rmf.base.client.ApiHttpResponse;

@Service
public class ShippingAddressService {
    @Autowired
    private TravelBuddiesConnector travelBuddiesConnector;

    public CompletableFuture<Cart> setShippingAddress(Cart cart, CustomerAddress address){
        CartSetShippingAddressAction cartSetShippingAddressAction = CartSetShippingAddressActionBuilder.of()
                .address(AddressBuilder.of()
                        .country(address.getCountry())
                        .city(address.getCity())
                        .apartment(address.getBuilding()).build()).build();
        CartUpdate cartUpdate = CartUpdateBuilder.of()
                .actions(cartSetShippingAddressAction)
                .version(cart.getVersion()).build();
        CompletableFuture<Cart> updatedCart = travelBuddiesConnector.getDefaultCTApi().carts()
                .withId(cart.getId())
                .post(cartUpdate).execute().thenApply(ApiHttpResponse::getBody);

        return updatedCart;


    }
}
