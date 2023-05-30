package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.UserProfileDTO;
import com.gifthommie.backend.entity.User;

public interface UserService {
	
	public APIPageableResponseDTO<User> getPageableUsers(int pageNo, int pageSize, Integer roleId);
	
	public User getUserByEmail(String email);
	
	public APIPageableResponseDTO<User> getPageableUsers(int pageNo, int pageSize, Integer roleId, boolean enabled);
	
	public boolean checkExistUser(String check);	
	
	public User getUserByEmailOrUsername(String check, boolean enabled);
	
	public boolean setEnabledUserByEmail(String email, boolean enabled);
	
	// Hàm này đã có lớp khác sử dụng 
	public User updateUserProfile(User user);
	
	//note: Overloading funtion updateUserProfile to get value from RequestBody by UserProfileDTO
	public User updateUserProfileDTO(UserProfileDTO user);
	
	public User createUser(User user);
	
	public APIPageableResponseDTO<User> searchUsers(int pageNo, int pageSize, int roleId, boolean enabled, String search);
}
