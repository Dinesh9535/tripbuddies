package com.tripbuddies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableDiscoveryClient
@RestController
public class AccountManagementServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AccountManagementServiceApplication.class, args);
    }
}