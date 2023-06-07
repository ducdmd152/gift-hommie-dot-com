package com.gifthommie.backend.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CartResponseDTO;
import com.gifthommie.backend.entity.Cart;
import com.gifthommie.backend.repository.CartRepository;

public interface CartService {

	public Cart getCartByEmailAndProductId(String email, int productId);
	
	APIPageableResponseDTO<CartResponseDTO> getPagableCart(Integer pageNo, Integer pageSize,String email);
	
	public Cart getCartByEmailAndCartId(String emai, int cartId);
	
	public Cart refresh(Cart cart);
	
	public Cart save(Cart cart);
	
	boolean deleteCart(String email, int productId);
	
	public CartResponseDTO convertToDTO(Cart cart);
}
