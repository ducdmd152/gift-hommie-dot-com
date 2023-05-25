package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.AuthUserRequestDTO;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.UserRepository;
import com.gifthommie.backend.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserRepository userRepository;
	// tạm thời dùng repo để tránh sửa service gây conflict với other members đang dùng service
	@PostMapping("/login")
	public User login(@RequestBody AuthUserRequestDTO loginDTO) {
		System.out.println("Login....");
		String username = loginDTO.getUsername();
		String password = loginDTO.getPassword();
		System.out.println(username + " " + password);
		Authentication auth = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password)
				);
		User user = userRepository.getUserByUsername(username);
		return user;
	}
}
