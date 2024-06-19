package com.tripbuddies.model.stripe;

import lombok.Data;

@Data
public class Card {
    public String cardNumber;
    public String expirationMonth;
    public String expirationYear;
    public String cvc;
    public String email;
    public Object installments;
    public Object mandate_options;
    public Object network;
    public String request_three_d_secure;

}
