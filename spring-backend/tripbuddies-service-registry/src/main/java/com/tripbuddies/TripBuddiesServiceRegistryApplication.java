package com.tripbuddies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class TripBuddiesServiceRegistryApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripBuddiesServiceRegistryApplication.class, args);
	}

}
