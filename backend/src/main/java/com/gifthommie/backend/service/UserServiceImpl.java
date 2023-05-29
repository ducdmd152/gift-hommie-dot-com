package com.gifthommie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.UserProfileDTO;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.UserRepository;
import com.gifthommie.backend.utils.SecurityUtils;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;

	final String DEFAULT_PASSWORD = "$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG";
	
	// getPageableUsers by role
	@Override
	public APIPageableResponseDTO<User> getPageableUsers(int pageNo, int pageSize, Integer roleId) {

		Page<User> page = userRepository.getUsersByRoleId(PageRequest.of(pageNo, pageSize), roleId);

		return new APIPageableResponseDTO<User>(page);
	}

	
	// getPageableUsers by role and status
	@Override
	public APIPageableResponseDTO<User> getPageableUsers(int pageNo, int pageSize, Integer roleId, boolean enabled) {
		Page<User> page = userRepository.getUsersByRoleId(PageRequest.of(pageNo, pageSize), roleId, enabled);

		return new APIPageableResponseDTO<User>(page);
	}
	
	// getUserByEmail
	@Override
	public User getUserByEmail(String email) {
		return userRepository.getUserByEmail(email);
	}

	// CHECK EXIST USER
	@Override
	public boolean checkExistUser(String check) {
		if (userRepository.getUserByEmail(check) == null && userRepository.getUserByUsername(check) == null)
			return false;

		return true;
	}

	
	// setEnabledUserByEmail
	@Override
	public boolean setEnabledUserByEmail(String email, boolean enabled) {
		return userRepository.setEnabledByEmail(email, enabled) > 0;
	}

	
	// createUser
	@Override
	public User createUser(User user) {
		// if USER IS EXIST
		if (checkExistUser(user.getUsername()) || checkExistUser(user.getEmail()))
			return null;

		// READY TO SAVE
		return userRepository.save(user);
	}

	
	// getUserByEmailOrUsername
	@Override
	public User getUserByEmailOrUsername(String check, boolean enabled) {
		return userRepository.getUserByUsernameOrEmail(check, enabled);
	}

	
	// updateUserProfile
	@Override
	public User updateUserProfile(User user) {
		return userRepository.save(user);
	}

	// updateUserProfile : get value from RequestBody by UserProfileDTO
	@Override
	public User updateUserProfileDTO(UserProfileDTO userDTO) {
		User user = SecurityUtils.getPrincipal().getUser();
		user.setUsername(userDTO.getUsername());
		user.setPassword(DEFAULT_PASSWORD);
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		user.setPhone(userDTO.getPhone());
		user.setYob(userDTO.getYob());
		user.setAvatar(userDTO.getAvatar());
		user.setAddress(userDTO.getAddress());
		user.setWardId(userDTO.getWardId());
		
		userRepository.save(user);
		
		return user;
	}

	

}
