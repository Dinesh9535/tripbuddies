package com.tripbuddies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import com.commercetools.api.models.cart.Cart;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripbuddies.model.customer.CustomerAddress;
import com.tripbuddies.service.CartService;
import com.tripbuddies.service.ShippingAddressService;

@RestController
@RequestMapping("/shippingAddress")
public class ShippingAddressController {

    @Autowired
    private ShippingAddressService shippingAddressService;

    @Autowired
    private CartService cartService;

    @PostMapping("/addAddressAnon")
    public CompletableFuture<?> addShippingAddressAnon(@RequestParam String anonymousId, @RequestBody CustomerAddress address) throws JsonProcessingException {
        CompletableFuture<Optional<Cart>> cartForAnonUser = cartService.getCartForAnonUser(anonymousId);

        return cartForAnonUser.thenApply(c -> {
            if (c.isPresent()) {
                return shippingAddressService.setShippingAddress(c.get(), address);
            }
            return CompletableFuture.completedFuture(null);
        }).thenCompose(e -> e);
    }

    @PostMapping("/addAddress")
    public CompletableFuture<?> addShippingAddress(@RequestParam String customerid, @RequestBody CustomerAddress address) throws JsonProcessingException {
        CompletableFuture<Optional<Cart>> cartForAnonUser = cartService.getCartForUser(customerid);

        return cartForAnonUser.thenApply(c -> {
            if (c.isPresent()) {
                return shippingAddressService.setShippingAddress(c.get(), address);
            }
            return CompletableFuture.completedFuture(null);
        }).thenCompose(e -> e);
    }
}
