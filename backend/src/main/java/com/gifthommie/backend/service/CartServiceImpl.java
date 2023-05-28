package com.gifthommie.backend.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.entity.Cart;
import com.gifthommie.backend.repository.CartRepository;

@Service
public class CartServiceImpl implements CartService{
	@Autowired
	CartRepository cartRepository;
	
	@Override
	public Cart getCartByEmailAndProductId(String email, int productId) {
		return cartRepository.findCartByEmailAndProductId(email, productId);
	}

	@Override
	public Cart save(Cart cart) {
		//SET LOCALTIME
		cart.setLastTimeUpdate(LocalDateTime.now());
	
		return cartRepository.save(cart);
	}
	
	
	
}
