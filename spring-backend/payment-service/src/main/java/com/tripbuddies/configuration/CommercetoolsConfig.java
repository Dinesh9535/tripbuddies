package com.tripbuddies.configuration;

import com.commercetools.api.client.ProjectApiRoot;
import com.commercetools.api.defaultconfig.ApiRootBuilder;
import io.vrap.rmf.base.client.oauth2.ClientCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import com.commercetools.api.defaultconfig.ServiceRegion;

@Configuration
@ConfigurationProperties("commercetools")
public class CommercetoolsConfig {

  @Value("project")
  String project;
  @Value("client_id")
  String clientId;
  @Value("client_secret")
  String clientSecret;
  @Value("oauth_url")
  String outhUrl;
  @Value("api_url")
  String apiUrl;
  @Value("scope")
  String scope;

  @Bean
    public static ProjectApiRoot createApiClient() {

      return ApiRootBuilder.of()
          .defaultClient(ClientCredentials.of()
                  .withClientId("{client_id}")
                  .withClientSecret("{client_secret}")
                  .build(),
              ServiceRegion.GCP_AUSTRALIA_SOUTHEAST1)
          .build("{project}");
  }
}
