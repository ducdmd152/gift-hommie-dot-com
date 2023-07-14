package com.gifthommie.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
	@Query("SELECT r FROM Review r WHERE r.orderDetail.productId = :productId AND r.enable = :enable")
	public Page<Review> findReviewsByProductId(Pageable pageable, @Param("productId") int productId, int enable);
	
}
