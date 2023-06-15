package com.gifthommie.backend.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
	@Query("SELECT c FROM Cart c WHERE "
			+ "c.email = :email "
			+ "AND c.id = :cartId")
	public Cart findCartByEmailAndCartId(@Param("email") String email, 
								@Param("cartId") int cartId);

	@Query("SELECT c FROM Cart c WHERE "
			+ "c.email = :email ORDER BY c.lastTimeUpdate DESC") // ADD ORDER BY DUY DUC
	public Page<Cart> findAllByEmail(@Param("email") String email,PageRequest pageRequest);
	
	@Query("SELECT c FROM Cart c WHERE "
			+ "c.email = :email ")
	public List<Cart> findAllByEmail(@Param("email") String email);
	
}
