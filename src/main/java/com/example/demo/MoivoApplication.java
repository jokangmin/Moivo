package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

// @SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@SpringBootApplication
public class MoivoApplication {

	public static void main(String[] args) {
		System.out.println("uj");
		SpringApplication.run(MoivoApplication.class, args);
	}

}
