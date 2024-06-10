package com.tripbuddies.service;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.commercetools.api.client.ApiRoot;
import com.commercetools.api.client.ByProjectKeyRequestBuilder;
import com.commercetools.api.defaultconfig.ApiRootBuilder;
import com.tripbuddies.configuration.OpenApiConfig;
import io.vrap.rmf.base.client.oauth2.ClientCredentialsBuilder;


@Service
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class TravelBuddiesConnector {
    private final OpenApiConfig openApiConfig;

    public TravelBuddiesConnector(OpenApiConfig config) {
        this.openApiConfig = config;
    }

    @Bean
    public ByProjectKeyRequestBuilder getDefaultCTApi() {
        ApiRoot apiRoot = ApiRootBuilder.of().defaultClient(new ClientCredentialsBuilder()
                        .withClientId(openApiConfig.getClientId())
                        .withClientSecret(openApiConfig.getClientSecret()).build(),
                openApiConfig.getAuthTokenUrl(), openApiConfig.getApiUrl()).build();
        return apiRoot.withProjectKey(openApiConfig.getProjectKey());
    }

}
