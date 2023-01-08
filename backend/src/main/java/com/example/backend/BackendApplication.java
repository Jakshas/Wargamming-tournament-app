package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Class
 **/
@SpringBootApplication
public class BackendApplication {

	/**
	 * @param args args of program
	 */
	// sudo /etc/init.d/mysql start
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
