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
	
	@Override
	public APIPageableResponseDTO<User> getPageableUsers(int pageNo, int pageSize, Integer roleId) {
		
		Page<User> page = userRepository.getUsersByRoleId(
							PageRequest.of(pageNo, pageSize), roleId);
		
		return new APIPageableResponseDTO<User>(page);
	}

	@Override
	public User getUserByEmail(String email) {
		return userRepository.getUserByEmail(email);
	}

	@Override
	public boolean editEnabledUserByEmail(String email, boolean enabled) {
		return userRepository.editEnabledByEmail(email, enabled) > 0;
	}

	@Override
	public boolean saveUser(User user) {
		
		userRepository.save(user);
		
		return true;
	}

	
	
}
