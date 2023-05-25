package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Role;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.RoleService;
import com.gifthommie.backend.service.UserService;

@RestController
@RequestMapping("/manager/staff")
public class ManagerStaffController {
	@Autowired
	UserService userService;
	
	@Autowired
	RoleService roleService;
	
	//Default Password for new Staff is 123456
	final String DEFAULT_PASSWORD = "$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG";
	
	//2 ROLE_STAFF IN DATABASE
	final String ROLE_STAFF = "ROLE_STAFF";
	// Delete ENABLED
	final boolean BAN_ENABLED = false;
	
	//View All Staff
	@GetMapping
	public APIPageableResponseDTO<User> getStaffList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize
			) {
		Role role = roleService.getRoleByRoleName(ROLE_STAFF);
		return userService.getPageableUsers(pageNo, pageSize, role.getId());
	}
	
	//View a staff by email
	@GetMapping("/{email}")
	public User getStaff(@PathVariable String email) {
		User u = userService.getUserByEmail(email);
		
		if (u == null)
			throw new NotFoundException("Cannot find User");
		
		return u;
	}
	
	//Delete a staff
	@DeleteMapping("/{email}")
	public boolean deleteStaff(@PathVariable String email) {
		//Delete staff by changing enabled = 0
		return userService.editEnabledUserByEmail(email, BAN_ENABLED);
	}
	
	//Create a Staff User
	@PostMapping
	public boolean createUser(@RequestBody User user) {
		Role role = roleService.getRoleByRoleName(ROLE_STAFF);
		
		user.setPassword(DEFAULT_PASSWORD);
		user.setEnabled(true);
		user.setRole(role);
		
		return userService.saveUser(user);
	}
	
	
}
