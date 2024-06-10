package com.tripbuddies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

import com.commercetools.api.client.ByProjectKeyRequestBuilder;
import com.commercetools.api.models.common.LocalizedString;
import com.commercetools.api.models.product.Product;
import com.commercetools.api.models.product.ProductDraft;
import com.commercetools.api.models.product.ProductDraftBuilder;
import com.commercetools.api.models.product_type.ProductType;
import com.commercetools.api.models.product_type.ProductTypeDraft;
import com.commercetools.api.models.product_type.ProductTypeDraftBuilder;
import com.commercetools.api.models.product_type.ProductTypeResourceIdentifier;
import io.vrap.rmf.base.client.ApiHttpResponse;

@Service
public class ProductService {
    @Autowired
    private ByProjectKeyRequestBuilder byProjectKeyRequestBuilder;
    @Autowired
    private TravelBuddiesConnector travelBuddiesConnector;

    public ProductTypeResourceIdentifier getProductTypeResourceIdentifier(String productTypeKey) {
        ProductTypeResourceIdentifier productTypeResourceIdentifier = (ProductTypeResourceIdentifier) travelBuddiesConnector.getDefaultCTApi().productTypes().withKey(productTypeKey).get().executeBlocking()
                .getBody().toResourceIdentifier();
        return productTypeResourceIdentifier;
    }

    public CompletableFuture<Product> addProduct(Product product) {
        ProductDraft productDraft = ProductDraftBuilder.of()
                .productType(getProductTypeResourceIdentifier(product.getProductType().getObj().getKey()))
                        .name(LocalizedString.ofEnglish(product.getKey()))
                .key(product.getKey())
                .slug(LocalizedString.ofEnglish("TEST"))
                .build();
        return byProjectKeyRequestBuilder.products().post(productDraft).execute().thenApply(ApiHttpResponse::getBody);
    }

    public CompletableFuture<ProductType> addProductType(ProductType productType) {
        ProductTypeDraft productTypeDraft = ProductTypeDraftBuilder.of()
                .key(productType.getKey())
                .name(productType.getName())
                .description(productType.getDescription())
                .build();

       return byProjectKeyRequestBuilder.productTypes().post(productTypeDraft).execute().thenApply(ApiHttpResponse::getBody);
    }
}
