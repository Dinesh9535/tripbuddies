package com.tripbuddies.service;

import com.commercetools.api.client.ProjectApiRoot;
import com.commercetools.api.models.cart.Cart;
import com.commercetools.api.models.cart.CartDraft;
import com.commercetools.api.models.cart.CartResourceIdentifier;
import com.commercetools.api.models.cart.CartUpdate;
import com.commercetools.api.models.customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommerceToolsService {

  private final ProjectApiRoot apiRoot;

  @Autowired
  public CommerceToolsService(ProjectApiRoot apiRoot) {
    this.apiRoot = apiRoot;
  }

  public Cart createCart(CartDraft cartDraft) {
    return apiRoot.carts().post(cartDraft).executeBlocking().getBody();
  }

  public Cart createCartForCustomer(String customerId) {
    Customer customer = apiRoot.customers().withId(customerId).get().executeBlocking().getBody();
    CartDraft cartDraft = CartDraft.builder()
        .customerId(customer.getId())
        .currency("USD")
        .build();

    return apiRoot.carts().post(cartDraft).executeBlocking().getBody();
  }

  public Cart updateCart(String cartId, CartUpdate cartUpdate) {
    return apiRoot.carts().withId(cartId).post(cartUpdate).executeBlocking().getBody();
  }
}
