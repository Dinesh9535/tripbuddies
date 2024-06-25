package com.tripbuddies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@ConfigurationPropertiesScan
public class StripeServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StripeServiceApplication.class, args);
    }

}