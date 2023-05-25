package com.gifthommie.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.gifthommie.backend.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

	@Query("SELECT u FROM User u WHERE u.username = :username")
	public User getUserByUsername(@Param("username") String username);
	
	@Query("SELECT u FROM User u WHERE u.email = :email")
	public User getUserByEmail(@Param("email") String email);
	
	//with enabled status
	@Query("SELECT u FROM User u WHERE u.enabled = :enabled and (u.email = :check OR u.username = :check)")
	public User getUserByUsernameOrEmail(@Param("check") String check, @Param("enabled") boolean enabled);
	
	//Get User List by Role ID with enabled status
	@Query("SELECT u FROM User u WHERE u.role.id = :roleId and u.enabled = :enabled")
	public Page<User> getUsersByRoleId(Pageable pageable, @Param("roleId") Integer role_id, @Param("enabled") boolean enabled);
	
	//Set Enabled
	@Transactional
	@Modifying
	@Query("UPDATE User u SET u.enabled = :enabled WHERE u.email = :email")
	public int setEnabledByEmail(@Param("email") String email, @Param("enabled") boolean enabled);

}