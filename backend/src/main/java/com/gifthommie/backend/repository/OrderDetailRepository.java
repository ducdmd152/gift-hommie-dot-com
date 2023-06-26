package com.gifthommie.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
	@Query("SELECT o "
			+ "FROM OrderDetail o "
			+ "WHERE o.id = :orderDetailId")
	public OrderDetail findOrderDetailById(@Param("orderDetailId") int orderDetailId);
	
	@Query("SELECT o FROM OrderDetail o "
			+ "WHERE o.productId = :productId AND "
			+ "o.rating IS NOT NULL AND o.rating <> 0")
	public Page<OrderDetail> findRatedOrderDetailsByProductId(Pageable pageable, @Param("productId") int productId);
	
	@Query("SELECT COALESCE(SUM(o.quantity), 0) FROM OrderDetail o "
			+ "WHERE (o.rating IS NOT NULL AND o.rating <> 0) AND "
			+ "o.productId = :productId")
	public Integer getSoldProductQuantityByProductId(@Param("productId") int productId);
	
	@Query("SELECT AVG(o.rating) FROM OrderDetail o "
			+ "WHERE (o.rating IS NOT NULL OR o.rating <> 0) AND "
			+ "o.productId = :productId")
	public Float getAverageRatingByProductId(@Param("productId") int productId);
	
	
}
