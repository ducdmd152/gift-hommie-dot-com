package com.gifthommie.backend.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Cart;
import com.gifthommie.backend.repository.CartRepository;

import net.bytebuddy.asm.Advice.OffsetMapping.Sort;

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
	
	@Override
	public APIPageableResponseDTO<Cart> getPagableCart(Integer pageNo, Integer pageSize, String email) {
		Page<Cart> page = cartRepository.findAllByEmail(email,PageRequest.of(pageNo, pageSize));
		return new APIPageableResponseDTO<Cart>(page);
	}

	@Override
	public Cart getCartByEmailAndCartId(String emai, int cartId) {
		return cartRepository.findCartByEmailAndCartId(emai, cartId);
	}

	@Override
	public boolean deleteCart(String email, int cartId) {
		cartRepository.deleteById(cartId);
		return true;
	}

	
	
}
