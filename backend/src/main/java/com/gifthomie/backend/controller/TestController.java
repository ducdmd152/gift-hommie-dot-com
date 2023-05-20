package com.gifthomie.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthomie.backend.entity.User;
import com.gifthomie.backend.repository.UserRepository;

@RestController
@RequestMapping("/test")
public class TestController {
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/user")
	public List<User> getUserList() {
		return userRepository.findAll();
	}
}
