package com.gifthommie.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CartRequestDTO;
import com.gifthommie.backend.dto.CartResponseDTO;
import com.gifthommie.backend.entity.Cart;

public interface CartService {

	public Cart getCartByEmailAndProductId(String email, int productId);
	
	APIPageableResponseDTO<CartResponseDTO> getPagableCart(Integer pageNo, Integer pageSize,String email);
	
	public Cart getCartByEmailAndCartId(String emai, int cartId);
	
//	public Cart refresh(Cart cart);
	
	public Cart refreshCart(Cart cart);
	
	public void refreshAllCartByEmail(String email);
	
	public int getShopAvailableQuantity(int productId);
	
	public int getCustomerAvailableQuantity(String email, int productId);
	
	public Cart save(Cart cart);
	
	boolean deleteCart(String email, int productId);
	
	public CartResponseDTO convertToDTO(Cart cart);
	
	public void deleteCartTrasit(List<CartRequestDTO> cartList, String email);
}
