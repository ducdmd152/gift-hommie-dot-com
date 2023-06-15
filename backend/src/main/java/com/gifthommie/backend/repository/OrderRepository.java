package com.gifthommie.backend.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer>{

	@Query("SELECT o FROM Orders o WHERE o.id = :orderId")
	public Orders findOrderByOrderId(@Param("orderId") Integer orderId);
	
	@Query("SELECT o FROM Orders o WHERE (o.status NOT IN :status)")
	public List<Orders> findOrdersWithoutStatus(@Param("status") String[] status);
	
	@Query("SELECT o FROM Orders o "
			+ "WHERE o.status NOT IN :status AND "
			+ ":productId IN (SELECT od.productId FROM o.orderDetails od)")
	public List<Orders> findOrdersByProductIdWithoutStatus(@Param("productId") int productId, 
											@Param("status") String[] status);
	
	@Query("SELECT sum(od.quantity) FROM Orders o JOIN "
			+ "o.orderDetails od WHERE od.orderId = o.id AND od.productId = :productId AND "
			+ "o.status NOT IN :status")
	public Integer getOrderedProductQuantityWithoutStatus(@Param("productId") int productId, 
										@Param("status") String[] status);
	
	@Query("SELECT o FROM Orders o WHERE "
			+ "o.email = :email ORDER BY o.orderTime DESC")
	public Page<Orders> findAllByEmail(@Param("email") String email, PageRequest pageRequest);
	
	//SET STATUS FOR ORDER BY ID
	@Transactional
	@Modifying
	@Query("UPDATE Orders o SET o.status = :status WHERE o.id = :orderId")
	public int setStatusOfOrderByOrderId(@Param("orderId") int orderId, 
										@Param("status") String status);
	
	
	@Query("SELECT p FROM Orders p WHERE p.status like %:status%")
	public Page<Orders> getOrderedWithStatus(String status, PageRequest pageRequest);
}
