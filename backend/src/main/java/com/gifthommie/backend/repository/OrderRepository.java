package com.gifthommie.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer>{

	@Query("SELECT o FROM Orders o WHERE o.id = :orderId")
	public Orders findOrderByOrderId(@Param("orderId") Integer orderId);
	
	@Query("SELECT o FROM Orders o WHERE NOT (o.status = :status)")
	public List<Orders> findOrdersWithoutStatus(@Param("status") String status);
	
	//FIND ALL ORDER WITHOUT STATUS = CANCELLED, FAIL OR REFUSED
	@Query("SELECT o FROM Orders o WHERE NOT "
			+ "(o.status = 'CANCELLED' OR o.status = 'FAIL' "
			+ "OR o.status = 'REFUSED')")
	public List<Orders> findNotCancelOrders();
}
