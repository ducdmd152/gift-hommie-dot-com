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
import com.gifthommie.backend.repository.UserRepository;
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
	// DELETE ENABLED
	final boolean BAN_ENABLED = false;
	// ACTIVE ENABLED
	final boolean ACTIVE_ENABLED = true;
	
	
	//View all enabled staff
	@GetMapping
	public APIPageableResponseDTO<User> getStaffList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize
			) {
		Role role = roleService.getRoleByRoleName(ROLE_STAFF);
		return userService.getPageableUsers(pageNo, pageSize, role.getId(), ACTIVE_ENABLED);
	}
	
	//View a enabled staff by email or username
	@GetMapping("/{check}")
	public User getStaff(@PathVariable String check) {
		User u = userService.getUserByEmailOrUsername(check, ACTIVE_ENABLED);
		
		if (u == null)
			throw new NotFoundException("Cannot find User");
		
		return u;
	}
	
	//Delete a enabled staff by username or email
	@DeleteMapping("/{check}")
	public User deleteStaff(@PathVariable String check) {
		//get user with email or username enabled
		User user = userService.getUserByEmailOrUsername(check, ACTIVE_ENABLED);
		
		//Check is it enabled to delete
		if (user == null)
			return null;
		
		//Delete by set enabled to false
		userService.setEnabledUserByEmail(check, BAN_ENABLED);
		return user;
	}
	
	//Create a Staff User
	@PostMapping
	public User createUser(@RequestBody User user) {
		Role role = roleService.getRoleByRoleName(ROLE_STAFF);
		
		user.setPassword(DEFAULT_PASSWORD);
		user.setEnabled(true);
		user.setRole(role);
		
		return userService.saveUser(user);
	}
	
	
}
