package com.gifthommie.backend.repository;

import java.time.LocalDateTime;
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
	@Query("SELECT o FROM Orders o WHERE "
			+ "o.email = :email AND o.status in :statuses ORDER BY o.orderTime DESC")
	public Page<Orders> findAllByEmailWithStatus(@Param("email") String email, @Param("statuses") List<String> statuses, PageRequest pageRequest);
	
	@Query("SELECT o FROM Orders o WHERE "
			+ "o.status in :statuses ORDER BY o.orderTime DESC")
	public Page<Orders> findAllWithStatus(@Param("statuses") List<String> statuses, PageRequest pageRequest);
	
	//SET STATUS FOR ORDER BY ID
	@Transactional
	@Modifying
	@Query("UPDATE Orders o SET o.status = :status WHERE o.id = :orderId")
	public int setStatusOfOrderByOrderId(@Param("orderId") int orderId, 
										@Param("status") String status);
	
	@Query("SELECT p FROM Orders p WHERE p.status like %:status%")
	public Page<Orders> getOrderedWithStatus(String status, PageRequest pageRequest);

	@Query("SELECT o FROM Orders o "
			+ "WHERE o.status = 'SUCCESSFUL' AND "
			+ ":startDate <= o.orderTime AND o.orderTime <= :endDate")
	public List<Orders> findSuccessfulOrdersFromTo(
			@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate); 
	
	@Query("SELECT o FROM Orders o "
			+ "WHERE :startDate <= o.orderTime AND o.orderTime <= :endDate")
	public List<Orders> findOrderByDay(
			@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate); 
	
	@Query("SELECT o FROM Orders o WHERE "
			+ "o.email = :email")
	public List<Orders> findAllByEmail(@Param("email") String email);
	
	//===========NEW=================
	@Query("SELECT SUM(od.price * od.quantity) FROM Orders o JOIN o.orderDetails od "
			+ "WHERE o.status = 'SUCCESSFUL' "
			+ "AND :startDate <= o.orderTime "
			+ "AND o.orderTime <= :endDate")
	public Double getRevenueFromTo(@Param("startDate") LocalDateTime startDate, 
						@Param("endDate") LocalDateTime endDate);
	
	@Query("SELECT SUM(od.quantity) FROM Orders o JOIN "
			+ "o.orderDetails od WHERE "
			+ "od.productId = :productId "
			+ "AND o.status = :status")
	public Integer getOrderedQuantityByProductId(@Param("productId") int productId, 
									@Param("status") String status);
	
	@Query("SELECT SUM(od.quantity) FROM Orders o JOIN "
			+ "o.orderDetails od WHERE "
			+ "od.productId = :productId "
			+ "AND o.status = :status "
			+ "AND :startDate <= o.orderTime "
			+ "AND o.orderTime <= :endDate")
	public Integer getOrderedQuantityByProductIdFromTo(@Param("productId") int productId, 
									@Param("status") String status, 
									@Param("startDate") LocalDateTime startDate, 
									@Param("endDate") LocalDateTime endDate);
	
	
	@Query("SELECT coalesce(AVG(od.rating), 5) FROM Orders o JOIN "
			+ "o.orderDetails od "
			+ "WHERE od.productId = :productId "
			+ "AND o.status = 'SUCCESSFUL' "
			+ "AND od.rating IS NOT NULL "
			+ "AND od.rating > 0 ")
	public Float getAverageRatingByProductId(@Param("productId") int productId);
	
	@Query("SELECT coalesce(AVG(od.rating), 5) FROM Orders o JOIN "
			+ "o.orderDetails od "
			+ "WHERE od.productId = :productId "
			+ "AND o.status = 'SUCCESSFUL' "
			+ "AND :startDate <= o.orderTime "
			+ "AND o.orderTime <= :endDate "
			+ "AND od.rating IS NOT NULL "
			+ "AND od.rating > 0 ")
	public Float getAverageRatingByProductIdFromTo(@Param("productId") int productId,  
								@Param("startDate") LocalDateTime startDate, 
								@Param("endDate") LocalDateTime endDate);
	
	@Query("SELECT od.productId FROM Orders o JOIN "
			+ "o.orderDetails od WHERE "
			+ "o.status = 'SUCCESSFUL' "
			+ "AND :startDate <= o.orderTime "
			+ "AND o.orderTime <= :endDate "
			+ "GROUP BY od.productId "
			+ "ORDER BY SUM(od.quantity) DESC")
	public List<Integer> findTopSoldProductFromTo(@Param("startDate") LocalDateTime startDate, 
							@Param("endDate") LocalDateTime endDate);

	@Query("SELECT od.productId FROM Orders o JOIN "
			+ "o.orderDetails od WHERE "
			+ "o.status = 'SUCCESSFUL' "
			+ "AND :startDate <= o.orderTime "
			+ "AND o.orderTime <= :endDate "
			+ "GROUP BY od.productId "
			+ "ORDER BY coalesce(AVG(od.rating), 0) DESC")
	public List<Integer> findTopRatingProductFromTo(@Param("startDate") LocalDateTime startDate, 
							@Param("endDate") LocalDateTime endDate);
}
