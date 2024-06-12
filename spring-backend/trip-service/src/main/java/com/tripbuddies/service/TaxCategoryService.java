package com.tripbuddies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import com.commercetools.api.models.tax_category.TaxCategory;
import com.commercetools.api.models.tax_category.TaxCategoryDraft;
import com.commercetools.api.models.tax_category.TaxCategoryDraftBuilder;
import com.commercetools.api.models.tax_category.TaxCategoryResourceIdentifier;
import com.commercetools.api.models.tax_category.TaxRate;
import com.commercetools.api.models.tax_category.TaxRateDraft;
import com.commercetools.api.models.tax_category.TaxRateDraftImpl;
import io.vrap.rmf.base.client.ApiHttpResponse;

@Service
public class TaxCategoryService {
    @Autowired
    private TravelBuddiesConnector travelBuddiesConnector;

    public CompletableFuture<TaxCategory> createTaxCategory(TaxCategory taxCategory) {
        List<TaxRateDraft> taxRateDraftList = taxCategory.getRates().stream().map(this::mapToTaxRateDraft).collect(Collectors.toList());
        TaxCategoryDraft taxCategoryDraft = TaxCategoryDraftBuilder.of()
                .name(taxCategory.getName())
                .key(taxCategory.getKey())
                .rates(taxRateDraftList)
                .build();

        return travelBuddiesConnector.getDefaultCTApi().taxCategories().post(taxCategoryDraft).execute().thenApply(ApiHttpResponse::getBody);
    }

    private TaxRateDraft mapToTaxRateDraft(TaxRate taxRate) {
        TaxRateDraft taxRateDraft = new TaxRateDraftImpl();
        taxRateDraft.setAmount(taxRate.getAmount());
        taxRateDraft.setName(taxRate.getName());
        taxRateDraft.setIncludedInPrice(taxRate.getIncludedInPrice());
        taxRateDraft.setCountry(taxRate.getCountry());
        return taxRateDraft;
    }

    public TaxCategory getTaxCategory(String taxCategoryName) {
        TaxCategory taxCategory = travelBuddiesConnector.getDefaultCTApi().taxCategories().withKey(taxCategoryName).get().executeBlocking()
                .getBody();
        return taxCategory;
    }

    public TaxCategoryResourceIdentifier getTaxCategoryResourceIdentifier(String taxCategoryName) {
        TaxCategoryResourceIdentifier taxCategoryResourceIdentifier = (TaxCategoryResourceIdentifier) travelBuddiesConnector.getDefaultCTApi().taxCategories().withKey(taxCategoryName).get().executeBlocking()
                .getBody().toResourceIdentifier();
        return taxCategoryResourceIdentifier;
    }

}
