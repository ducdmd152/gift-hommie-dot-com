package com.gifthommie.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {	
	@GetMapping("/customer/test")
	public String customer() {
		return "Welcome to CUSTOMER APIs!!!";
	}
	
	@GetMapping("/staff/test")
	public String staff() {
		return "Welcome to STAFF APIs!!!";
	}
	
	@GetMapping("/manager/test")
	public String manager() {
		return "Welcome to MANAGER APIs!!!";
	}
}
