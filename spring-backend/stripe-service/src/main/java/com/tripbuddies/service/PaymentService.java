package com.tripbuddies.service;

import com.commercetools.api.models.payment.TransactionDraft;
import com.tripbuddies.model.stripe.PaymentModelRoot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.concurrent.CompletableFuture;

import com.commercetools.api.models.common.CentPrecisionMoney;
import com.commercetools.api.models.common.MoneyBuilder;
import com.commercetools.api.models.common.TypedMoney;
import com.commercetools.api.models.payment.Payment;
import com.commercetools.api.models.payment.PaymentDraft;
import com.commercetools.api.models.payment.PaymentDraftBuilder;
import com.commercetools.api.models.payment.PaymentMethodInfoBuilder;
import com.commercetools.api.models.payment.TransactionDraftBuilder;
import com.commercetools.api.models.payment.TransactionState;
import com.commercetools.api.models.payment.TransactionType;
import io.vrap.rmf.base.client.ApiHttpResponse;

@Service
public class PaymentService {
    @Autowired
    private PaymentCTConnector paymentCTConnector;

    public CompletableFuture<Payment> addPayment(String paymentMethod, String anonymousId, TypedMoney totalGross, String interfaceId) {
        return paymentCTConnector.getDefaultPaymentApi().payments().post(createPaymentDraft(paymentMethod, totalGross, interfaceId))
                .execute()
                .thenApply(ApiHttpResponse::getBody);
    }

    public CompletableFuture<Payment> getPaymentWithId(String paymentid) {
        return paymentCTConnector.getDefaultPaymentApi().payments().withId(paymentid).get()
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

    public CompletableFuture<Payment> captureStripePayment(PaymentModelRoot paymentModel) {
        if (Objects.nonNull(paymentModel)) {
            String paymentModelType = paymentModel.getType();
            if ("payment_intent.succeeded".equals(paymentModelType)) {
                if (Objects.nonNull(paymentModel.getData()) && Objects.nonNull(paymentModel.getData().getObject())) {
                    String paymentId = paymentModel.getData().getObject().getId();

                    TransactionDraft transactionDraft = TransactionDraft.builder()
                            .type(TransactionType.CHARGE)
                            .amount(centAmount(paymentModel.getData().getObject().getAmount()))
                            .state(TransactionState.INITIAL)

                            .build();

                    PaymentDraft paymentDraft = PaymentDraft.builder()
                            .amountPlanned(centAmount(paymentModel.getData().getObject().getAmount()))
                            .paymentMethodInfo(paymentMethodInfoBuilder -> paymentMethodInfoBuilder.method("Stripe"))
                            .transactions(transactionDraft)
                            .interfaceId(paymentId)
                            .build();

                    return paymentCTConnector.getDefaultPaymentApi().payments()
                            .post(paymentDraft).execute().thenApply(ApiHttpResponse::getBody);
                }
            }
        }
        return null;
    }
    private CentPrecisionMoney centAmount (Long amount){
        return CentPrecisionMoney.builder()
                .centAmount(amount)
                .currencyCode("INR")
                .fractionDigits(2)
                .build();
    }


}

