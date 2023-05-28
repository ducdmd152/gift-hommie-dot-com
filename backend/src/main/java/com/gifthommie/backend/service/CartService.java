package com.gifthommie.backend.service;

import java.time.LocalDateTime;

import com.gifthommie.backend.entity.Cart;

public interface CartService {

	public Cart getCartByEmailAndProductId(String email, int productId);
	
	public Cart save(Cart cart);
	
}
