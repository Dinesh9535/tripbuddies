package com.tripbuddies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

import com.commercetools.api.models.tax_category.TaxCategory;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.tripbuddies.service.TaxCategoryService;

@RestController
@RequestMapping("/taxCategory")
public class TaxCategoryController {
    @Autowired
    private TaxCategoryService taxCategoryService;
    
    @PostMapping("/createTaxCategory")
    public CompletableFuture<TaxCategory> addItemToCartAnonymous(@RequestBody TaxCategory taxCategory) throws JsonProcessingException {
        return taxCategoryService.createTaxCategory(taxCategory);
    }
}
