package com.tripbuddies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

import com.commercetools.api.models.product.Product;
import com.commercetools.api.models.product_type.ProductType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripbuddies.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductsController {
    @Autowired
    private ProductService productService;
    
    @PostMapping("/addProduct")
    public CompletableFuture<Product> addProduct(@RequestBody Product product) throws JsonProcessingException {
        return productService.addProduct(product);
    }

    @PostMapping("/product-types")
    public CompletableFuture<ProductType> addProductType(@RequestBody ProductType productType) throws JsonProcessingException {
        return productService.addProductType(productType);
    }

}
