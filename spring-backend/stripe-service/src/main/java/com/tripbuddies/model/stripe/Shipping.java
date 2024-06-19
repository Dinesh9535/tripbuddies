package com.tripbuddies.model.stripe;

import lombok.Data;

@Data
public class Shipping {
        public Address address;
        public java.lang.Object carrier;
        public String name;
        public java.lang.Object phone;
        public java.lang.Object tracking_number;

}
