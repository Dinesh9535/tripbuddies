package com.tripbuddies.model.stripe;

@lombok.Data
public class PaymentModelRoot {
    public String id;
    public String object;
    public String api_version;
    public int created;
    public Data data;
    public boolean livemode;
    public int pending_webhooks;
    public Request request;
    public String type;

}
