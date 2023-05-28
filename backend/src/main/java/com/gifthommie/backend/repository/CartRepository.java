package com.gifthommie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.Cart;

//import com.gifthommie.backend.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer>{
	
	@Query("SELECT cart FROM Cart cart WHERE "
			+ "cart.email = :email "
			+ "AND cart.product.id = :productId")
	public Cart findCartByEmailAndProductId(@Param("email") String email, 
								@Param("productId") int productId);
	
}
