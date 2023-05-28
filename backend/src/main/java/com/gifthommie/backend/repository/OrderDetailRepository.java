package com.gifthommie.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{
	
	@Query("SELECT o FROM OrderDetail o WHERE o.productId = :product_id AND o.order.status != :status")
	public List<OrderDetail> findOrderDetailByProductIdWithoutStatus(@Param("product_id") int productId, @Param("status") int status);
}
