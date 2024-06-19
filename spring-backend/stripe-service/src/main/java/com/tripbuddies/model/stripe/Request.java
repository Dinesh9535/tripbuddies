package com.tripbuddies.model.stripe;

import lombok.Data;

@Data
public class Request {
    public java.lang.Object id;
    public String idempotency_key;

}
