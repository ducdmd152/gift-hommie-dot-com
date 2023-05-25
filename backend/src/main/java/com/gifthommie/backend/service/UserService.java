package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.User;

public interface UserService {
	
	public APIPageableResponseDTO<User> getPageableUsers(int pageNo, int pageSize, Integer roleId);
	
	public User getUserByEmail(String email);
	
	public boolean editEnabledUserByEmail(String email, boolean enabled);
	
	public boolean saveUser(User user);
}
