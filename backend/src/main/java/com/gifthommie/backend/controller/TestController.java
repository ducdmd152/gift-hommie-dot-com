package com.gifthommie.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.UserRepository;

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
