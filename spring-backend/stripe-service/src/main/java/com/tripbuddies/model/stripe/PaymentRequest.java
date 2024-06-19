package com.tripbuddies.model.stripe;
import lombok.Data;

@Data
public class PaymentRequest {
    public String source;
    public String amount;
    public String currency;
    public String description;
}


