package com.assolution.inscriptions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class InscriptionsApplication {

	public static void main(String[] args) {
		SpringApplication.run(InscriptionsApplication.class, args);
	}

}
