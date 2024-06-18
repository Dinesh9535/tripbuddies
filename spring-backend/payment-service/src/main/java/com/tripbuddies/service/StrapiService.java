package com.tripbuddies.service;


import com.stripe.model.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class StrapiService {

  @Value("${strapi.api.url}")
  private String strapiApiUrl;

  private final RestTemplate restTemplate = new RestTemplate();

  public Product[] getProducts() {
    String url = strapiApiUrl + "/products";
    return restTemplate.getForObject(url, Product[].class);
  }
}

