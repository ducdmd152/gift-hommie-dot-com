package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.UserService;

@RestController
@RequestMapping("/manager/staff")
public class ManagerStaffController {
	@Autowired
	UserService userService;
	
	//2 ROLE_STAFF IN DATABASE
	final int role_id = 2;
	
	//View All Staff
	@GetMapping
	public APIPageableResponseDTO<User> getStaffList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize
			) {
		return userService.getPageableUsers(pageNo, pageSize, role_id);
	}
	
	@GetMapping("/{email}")
	public User getStaff(@PathVariable String email) {
		User u = userService.getUserByEmail(email);
		
		if (u == null)
			throw new NotFoundException("Cannot find User");
		
		return u;
	}

}
