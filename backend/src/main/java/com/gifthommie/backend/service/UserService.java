package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.User;

public interface UserService {
	
	public APIPageableResponseDTO<User> getPageableUsers(int pageNo, int pageSize, Integer roleId);
	
	public User getUserByEmail(String email);
	
	public APIPageableResponseDTO<User> getPageableUsers(int pageNo, int pageSize, Integer roleId, boolean enabled);
	
	public boolean checkExistUser(String check);	
	
	public User getUserByEmailOrUsername(String check, boolean enabled);
	
	public boolean setEnabledUserByEmail(String email, boolean enabled);
	
	public User updateUserProfile(User user);
	
	public User createUser(User user);
}
