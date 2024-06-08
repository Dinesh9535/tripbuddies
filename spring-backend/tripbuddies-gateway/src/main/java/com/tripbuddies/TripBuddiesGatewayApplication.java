package com.tripbuddies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class TripBuddiesGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripBuddiesGatewayApplication.class, args);
	}

}
