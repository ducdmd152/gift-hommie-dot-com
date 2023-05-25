package com.gifthommie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserRepository userRepository;
	
	//check exist User
	@Override
	public boolean checkExistUser(String check) {
		if (userRepository.getUserByEmail(check) == null && 
				userRepository.getUserByUsername(check) == null)
			return false;
		
		return true;
	}
	
	@Override
	public APIPageableResponseDTO<User> getPageableUsers(int pageNo, int pageSize, 
			Integer roleId, boolean enabled) {
		
		Page<User> page = userRepository.getUsersByRoleId(
							PageRequest.of(pageNo, pageSize), roleId, enabled);
		
		return new APIPageableResponseDTO<User>(page);
	}
	
	@Override
	public boolean setEnabledUserByEmail(String email, boolean enabled) {
		return userRepository.setEnabledByEmail(email, enabled) > 0;
	}

	@Override
	public User saveUser(User user) {
		//if exist user
		if (checkExistUser(user.getUsername()) || 
				checkExistUser(user.getEmail()))
			return null;
		
		//Ready to Save
		return userRepository.save(user);
	}

	@Override
	public boolean updateUserProfileByEmail(String email, User newProfile) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public User getUserByEmailOrUsername(String check, boolean enabled) {
		return userRepository.getUserByUsernameOrEmail(check, enabled);
	}
	
}
