package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.ProductRequestDTO;
import com.gifthommie.backend.dto.UserProfileDTO;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.UserService;
import com.gifthommie.backend.utils.SecurityUtils;

@RestController
@RequestMapping("/customer/account")
public class CustomerAccountController {
	
	@Autowired
	UserService userService;
	
	
	// Update updateUserDTO	
	/* http://localhost:8080/customer/account
	 * make sure là tài khoản đang đăng nhập đang ở role customer
	 * -----------------------------------------------------------
	 * Auth Example: customer 123456
	 * Data Example: update UserDATA
	 * 
	 {
           	"username": "customer",
            "firstName": "Khách Hàng là",
            "lastName": "Thượng Đế",
            "phone": "0123456789",
            "yob": 2021,
            "avatar": null,
            "address": null,
            "wardId": null
		}
		
		password hiện tại đang để default BCrypt là 123456
	 */
	@GetMapping()
	public User getUser() {
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		return userService.getUserByEmail(email);
	}
	@PutMapping()
	public User updateUserDTO(@RequestBody UserProfileDTO userRequestDTO) {
		String email = SecurityUtils.getPrincipal().getUser().getEmail();
		User user = userService.updateUserProfileDTO(email, userRequestDTO);
		return user;
	}

}
