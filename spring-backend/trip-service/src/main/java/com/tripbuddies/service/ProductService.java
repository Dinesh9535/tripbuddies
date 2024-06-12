package com.tripbuddies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import com.commercetools.api.models.common.LocalizedString;
import com.commercetools.api.models.common.Money;
import com.commercetools.api.models.common.MoneyBuilder;
import com.commercetools.api.models.common.PriceDraft;
import com.commercetools.api.models.common.PriceDraftBuilder;
import com.commercetools.api.models.product.Product;
import com.commercetools.api.models.product.ProductDraft;
import com.commercetools.api.models.product.ProductDraftBuilder;
import com.commercetools.api.models.product.ProductVariantDraft;
import com.commercetools.api.models.product.ProductVariantDraftBuilder;
import com.commercetools.api.models.product_type.ProductType;
import com.commercetools.api.models.product_type.ProductTypeDraft;
import com.commercetools.api.models.product_type.ProductTypeDraftBuilder;
import com.commercetools.api.models.product_type.ProductTypeResourceIdentifier;
import com.tripbuddies.dto.ProductDTO;
import io.vrap.rmf.base.client.ApiHttpResponse;

@Service
public class ProductService {
    @Autowired
    private TravelBuddiesConnector travelBuddiesConnector;
    @Autowired
    private TaxCategoryService taxCategoryService;

    public ProductTypeResourceIdentifier getProductTypeResourceIdentifier(String productTypeKey) {
        ProductTypeResourceIdentifier productTypeResourceIdentifier = (ProductTypeResourceIdentifier) travelBuddiesConnector.getDefaultCTApi().productTypes().withKey(productTypeKey).get().executeBlocking()
                .getBody().toResourceIdentifier();
        return productTypeResourceIdentifier;
    }

    public CompletableFuture<Product> addProduct(ProductDTO productDTO) {
        UUID uuid = UUID.randomUUID();
        Money money = MoneyBuilder.of().currencyCode(productDTO.getPriceCurrency()).centAmount(productDTO.getPrice()).build();
        PriceDraft priceDraft = PriceDraftBuilder.of().country(productDTO.getCountry()).value(money).build();
        ProductVariantDraft productVariantDraft= ProductVariantDraftBuilder.of().prices(priceDraft).build();
        ProductDraft productDraft = ProductDraftBuilder.of()
                .productType(getProductTypeResourceIdentifier(productDTO.getProductType()))
                .name(LocalizedString.ofEnglish(productDTO.getName()))
                .taxCategory(taxCategoryService.getTaxCategoryResourceIdentifier(productDTO.getTaxCategory()))
                .key(productDTO.getKey())
                .slug(LocalizedString.ofEnglish(uuid.toString()))
                .masterVariant(productVariantDraft)
                .publish(true)
                .build();
        return travelBuddiesConnector.getDefaultCTApi().products().post(productDraft).execute().thenApply(ApiHttpResponse::getBody);
    }

    public CompletableFuture<ProductType> addProductType(ProductType productType) {
        ProductTypeDraft productTypeDraft = ProductTypeDraftBuilder.of()
                .key(productType.getKey())
                .name(productType.getName())
                .description(productType.getDescription())
                .build();

       return travelBuddiesConnector.getDefaultCTApi().productTypes().post(productTypeDraft).execute().thenApply(ApiHttpResponse::getBody);
    }
}
