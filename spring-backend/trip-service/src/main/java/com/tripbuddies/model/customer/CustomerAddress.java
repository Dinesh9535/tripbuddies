package com.tripbuddies.model.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerAddress {
    private String floor;
    private String building;
    private String door;
    private String city;
    private String country;
}
