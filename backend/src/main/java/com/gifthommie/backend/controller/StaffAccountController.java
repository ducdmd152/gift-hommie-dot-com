package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.UserProfileDTO;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.service.UserService;
import com.gifthommie.backend.utils.SecurityUtils;

@RestController
@RequestMapping("/staff/account")
public class StaffAccountController {
		@Autowired
		UserService userService;
		
		@GetMapping()
		public User getUser() {
			User user = SecurityUtils.getPrincipal().getUser();
			String email = user.getEmail();
			return userService.getUserByEmail(email);
		}
		
		
		// Update updateUserDTO	
			/* http://localhost:8080/staff/account
			  */
//		{
//	       	"username": "AaronLucas",
//	        "firstName": "Khách Hàng là",
//	        "lastName": "Thượng Đế",
//	        "phone": "0123456789",
//	        "yob": 2021,
//	        "avatar": null,
//	        "address": null,
//	        "wardId": null,
//	        "gender": "Female"
//		}
		
		@PutMapping()
		public User updateUserDTO(@RequestBody UserProfileDTO userRequestDTO) {
			String email = SecurityUtils.getPrincipal().getUser().getEmail();
			User user = userService.updateUserProfileDTO(email, userRequestDTO);
			return user;
		}
		
}
