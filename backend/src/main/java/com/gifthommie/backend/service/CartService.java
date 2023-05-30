package com.gifthommie.backend.service;

import java.time.LocalDateTime;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Cart;

public interface CartService {

	public Cart getCartByEmailAndProductId(String email, int productId);
	
	APIPageableResponseDTO<Cart> getPagableCart(Integer pageNo, Integer pageSize,String email);
	
	public Cart getCartByEmailAndCartId(String emai, int cartId);
	
	public Cart save(Cart cart);
	
	boolean deleteCart(String email, int cartId);
}
