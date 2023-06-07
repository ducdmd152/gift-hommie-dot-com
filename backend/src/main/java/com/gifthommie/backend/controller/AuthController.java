package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.AuthUserRequestDTO;
import com.gifthommie.backend.dto.RegisterDTO;
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
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public User login(@RequestBody AuthUserRequestDTO loginDTO) {
		String username = loginDTO.getUsername();
		String password = loginDTO.getPassword();
//		System.out.println(username + " : " + password);
		Authentication auth = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password)
				);
		User user = userRepository.getUserByUsername(username);
		return user;
	}
	
	@PostMapping("/register")
	public User register(@RequestBody RegisterDTO registerDTO) {
		String username = registerDTO.getUsername();
		String email = registerDTO.getPassword();
		User user = userService.register(registerDTO);
		if(user == null) {
			throw new RuntimeException("Can not sign up for the data.");
		}
		return user;
	}
	
	@PostMapping("/register/error/username")
	public boolean registerCheckExi(@RequestParam String username) {
		if(userService.checkExistUser(username)) {
			throw new RuntimeException("Exist username!");
		}
		return true;
	}
	
	@PostMapping("/register/error/email")
	public boolean register(@RequestParam String email) {
		if(userService.checkExistUser(email)) {
			throw new RuntimeException("Exist email!");
		}
		return true;
	}
	
}
