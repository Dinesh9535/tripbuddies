package com.tripbuddies.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    String key;
    String name;
    String description;
    String productType;
    String taxCategory;
    String sku;
    String priceCurrency;
    Long price;
    String slug;
    String country;

}
