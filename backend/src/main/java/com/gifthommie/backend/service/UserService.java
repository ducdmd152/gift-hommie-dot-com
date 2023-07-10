 package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.RegisterDTO;
import com.gifthommie.backend.dto.UserProfileDTO;
import com.gifthommie.backend.dto.UserStatisticsDTO;
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
	public User updateUserProfileDTO(String userEmail, UserProfileDTO user);
	
	public User createUser(User user);
	
	public APIPageableResponseDTO<User> searchUsers(int pageNo, int pageSize, int roleId, boolean enabled, String search);

	public User register(RegisterDTO registerDTO);
	
	
	public User getResetPasswordToken(String resetPaswordToken);
	
	public void updateResetPassword (String token, String email);
	
	public void updateUserPassword (User user, String new_Password);
	
	public User getExTime(String token);
	
	public void getUserStatictisByOrder(String date, UserStatisticsDTO userStatisticsDTO);
	public void getUserStatictisByProduct(String date,UserStatisticsDTO userStatisticsDTO);
	public void getUserStatictisByAmount(String date,UserStatisticsDTO userStatisticsDTO);
	public UserStatisticsDTO getUserStatictis(String date);

	APIPageableResponseDTO<User> searchUsers(int pageNo, int pageSize, int roleId, String search);

	User getUserByEmailOrUsername(String check);
}
