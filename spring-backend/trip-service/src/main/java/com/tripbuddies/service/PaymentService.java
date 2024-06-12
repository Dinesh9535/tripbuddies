package com.tripbuddies.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

import com.commercetools.api.client.ByProjectKeyRequestBuilder;
import com.commercetools.api.models.common.CentPrecisionMoney;
import com.commercetools.api.models.common.MoneyBuilder;
import com.commercetools.api.models.common.TypedMoney;
import com.commercetools.api.models.payment.Payment;
import com.commercetools.api.models.payment.PaymentDraft;
import com.commercetools.api.models.payment.PaymentDraftBuilder;
import com.commercetools.api.models.payment.PaymentMethodInfoBuilder;
import com.commercetools.api.models.payment.TransactionDraft;
import com.commercetools.api.models.payment.TransactionDraftBuilder;
import com.commercetools.api.models.payment.TransactionState;
import com.commercetools.api.models.payment.TransactionType;
import io.vrap.rmf.base.client.ApiHttpResponse;

@Service
public class PaymentService {
    @Autowired
    private TravelBuddiesConnector travelBuddiesConnector;

    public CompletableFuture<Payment> addPayment(String paymentMethod, String anonymousId, TypedMoney totalGross, String interfaceId) {
        return travelBuddiesConnector.getDefaultCTApi().payments().post(createPaymentDraft(paymentMethod, totalGross, interfaceId))
                .execute()
                .thenApply(ApiHttpResponse::getBody);
    }

    public CompletableFuture<Payment> getPaymentWithId(String paymentid) {
        return travelBuddiesConnector.getDefaultCTApi().payments().withId(paymentid).get()
                .execute()
                .thenApply(ApiHttpResponse::getBody);
    }

    private PaymentDraft createPaymentDraft(String paymentMethod, TypedMoney money, String interfaceId) {
        return PaymentDraftBuilder.of()
                .amountPlanned(MoneyBuilder.of()
                        .centAmount(money.getCentAmount())
                        .currencyCode(money.getCurrencyCode())
                        .build())
                .paymentMethodInfo(PaymentMethodInfoBuilder.of()
                        .method(paymentMethod)
                        //.paymentInterface(paymentMethod.getProvider().getDisplayName())
                        .build())
                .interfaceId(interfaceId)
                .transactions(TransactionDraftBuilder.of()
                        .amount(MoneyBuilder.of()
                                .centAmount(money.getCentAmount())
                                .currencyCode(money.getCurrencyCode())
                                .build())
                        .state(TransactionState.INITIAL)
                        .type(TransactionType.CHARGE)
                        .build())
                .build();
    }

    private CentPrecisionMoney centAmount (Long amount){
        return CentPrecisionMoney.builder()
                .centAmount(amount)
                .currencyCode("INR")
                .fractionDigits(2)
                .build();
    }


}

