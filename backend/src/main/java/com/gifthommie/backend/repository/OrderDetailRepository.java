package com.gifthommie.backend.repository;

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
			+ "WHERE o.productId = :productId")
	public Page<OrderDetail> findOrderDetailsByProductId(Pageable pageable, @Param("productId") int productId);
}
