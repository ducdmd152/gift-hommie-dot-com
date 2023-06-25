package com.gifthommie.backend.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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

	@Query("SELECT u FROM User u WHERE u.role.id = :roleId")
	public Page<User> getUsersByRoleId(Pageable pageable, @Param("roleId") Integer role_id);
	
	// with enabled status
	@Query("SELECT u FROM User u WHERE u.enabled = :enabled and (u.email = :check OR u.username = :check)")
	public User getUserByUsernameOrEmail(@Param("check") String check, @Param("enabled") boolean enabled);

	// Get User List by Role ID with enabled status
	@Query("SELECT u FROM User u WHERE u.role.id = :roleId AND u.enabled = :enabled")
	public Page<User> getUsersByRoleId(Pageable pageable, @Param("roleId") Integer role_id,
			@Param("enabled") boolean enabled);

	// Set Enabled
	@Transactional
	@Modifying
	@Query("UPDATE User u SET u.enabled = :enabled WHERE "
			+ "(u.email = :emailOrUsername OR u.username = :emailOrUsername)")
	public int setEnabledByEmail(@Param("emailOrUsername") String emailOrUsername, @Param("enabled") boolean enabled);
	
	//FILTER USER BY USERNAME, EMAIL, NAME
	@Query("SELECT u FROM User u "
			+ "WHERE u.role.id = :roleId "
			+ "AND u.enabled = :enabled AND (u.username LIKE %:search% "
			+ "OR u.email LIKE %:search% OR (u.firstName || ' ' || u.lastName LIKE %:search%))")
	public Page<User> filterUsersByRoleId(Pageable pageable, @Param("roleId") int roleId, 
								@Param("enabled") boolean enabled, 
								@Param("search") String search);
	
	
	
	// Tìm reset password token
	@Query("SELECT u FROM User u WHERE u.reset_password_token = :token")
	public User getResetPasswordToken(@Param("token") String token);
	
	
	@Query("SELECT u FROM User u WHERE u.reset_password_token = :token and expired_vertification_code > CURRENT_TIMESTAMP")
	public User getExTime(@Param("token") String token);
	
	 @Query(value = "SELECT u.* FROM user u "
	            + "LEFT JOIN (SELECT o.email, COUNT(*) AS order_count FROM orders o GROUP BY o.email) o "
	            + "ON u.email = o.email "
	            + "WHERE o.order_count > 0  "
	            + "ORDER BY o.order_count DESC", nativeQuery = true)
	 public List<User> findAllByOrderCountDesc();
	 
	 @Query(value = "SELECT u.* FROM user u "
			+"LEFT JOIN ( SELECT o.email, COUNT(od.id) AS total_products FROM orders o "
			+"LEFT JOIN order_detail od ON o.id = od.order_id where o.status='SUCCESSFUL' GROUP BY o.email) t"
			+" ON u.email = t.email"
	 		+ " WHERE total_products > 0  "
	 		+ " ORDER BY t.total_products DESC", nativeQuery = true)
	 public List<User> findAllByProductCountDesc();
	 
	 @Query(value ="SELECT u.* "
	 		+ "FROM user u "
	 		+ "JOIN orders o ON u.email = o.email "
	 		+ "JOIN order_detail od ON o.id = od.order_id "
	 		+ "WHERE o.status = 'SUCCESSFUL' "
	 		+ "GROUP BY  u.email, u.username, u.address "
	 		+ "ORDER BY SUM(od.price * od.quantity)  DESC ",nativeQuery = true)
	 public List<User> findAllOrderByTotalSpentDesc();
	 
//	 @Query("SELECT SUM(od.price * od.quantity) AS totalSpent "
//	           + " FROM User u "
//	           + " JOIN Orders o "
//	           + " JOIN o.orderDetail od "
//	           + " WHERE o.status = 'SUCCESSFUL' AND u.email=:email AND u.email=o.email"
//	           + " GROUP BY u.email, u.username, u.address")
//	public Long calculateTotalSpent(@Param("email") String email);
	 
//	 @Query("SELECT u FROM User u"+
//			 " LEFT JOIN ( SELECT o.email, COUNT(o.email) AS order_count FROM Orders o GROUP BY o.email ) o "
//			 +"ON u.email = o.email WHERE o.order_count > 0"
//			 +" ORDER BY o.order_count DESC")
//	 public List<User> findAllByOrderCountDesc();


	
}