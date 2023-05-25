package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.entity.Role;
import com.gifthommie.backend.repository.RoleRepository;

@RestController
public class TestController {
	@Autowired
	RoleRepository roleRepository;
	
	@GetMapping("/public/test")
	public String publicx() {
		return "Welcome to APIs!!!";
	}
	@GetMapping("/customer/test")
	public String customer() {
		return "Welcome to CUSTOMER APIs!!!";
	}
	
	@GetMapping("/staff/test")
	public String staff() {
		return "Welcome to STAFF APIs!!!";
	}
	
	@GetMapping("/manager/test")
	public Role manager() {
		
		return roleRepository.getRoleByRoleName("ROLE_STAFF");
	
	}
}
