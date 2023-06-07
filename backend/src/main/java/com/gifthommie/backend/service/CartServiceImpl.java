package com.gifthommie.backend.service;

import java.awt.print.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableDTO;
import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CartResponseDTO;
import com.gifthommie.backend.entity.Cart;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.repository.CartRepository;
import com.gifthommie.backend.repository.OrderRepository;

@Service
public class CartServiceImpl implements CartService{
	@Autowired
	CartRepository cartRepository;
	@Autowired
	OrderRepository orderRepository;
	
	private final String CANCELED_ORDER_STATUS = "CANCEL";
	
	@Override
	public Cart getCartByEmailAndProductId(String email, int productId) {
		return cartRepository.findCartByEmailAndProductId(email, productId);
	}

	@Override
	public Cart save(Cart cart) {
		//SET LOCALTIME
		cart.setLastTimeUpdate(LocalDateTime.now());
		
		//BEFORE SAVE CART, REFRESH CART
		refresh(cart);
		
		return cartRepository.save(cart);
	}
	
	@Override
	public APIPageableResponseDTO<CartResponseDTO> getPagableCart(Integer pageNo, Integer pageSize, String email) {
		Page<Cart> page = cartRepository.findAllByEmail(email,PageRequest.of(pageNo, pageSize));
		
		//Convert Page<Cart> -> Page<CartResponseDTO>
		List<CartResponseDTO> cartResponseList = page.getContent().stream().map(this::convertToDTO).collect(Collectors.toList());
		APIPageableResponseDTO<CartResponseDTO> apiResponse = new APIPageableResponseDTO<>();		
		apiResponse.setContent(cartResponseList);
		APIPageableDTO apiPageble = new APIPageableDTO(page);
		apiResponse.setPageable(apiPageble);
		
		return apiResponse;
	}
	
	@Override
	public CartResponseDTO convertToDTO(Cart cart) {
		CartResponseDTO cartResponseDTO = new CartResponseDTO(cart);
		return cartResponseDTO;
	}

	@Override
	public Cart getCartByEmailAndCartId(String emai, int cartId) {
		return cartRepository.findCartByEmailAndCartId(emai, cartId);
	}

	@Override
	public boolean deleteCart(String email, int productId) {
		Cart c = cartRepository.findCartByEmailAndProductId(email, productId);
		cartRepository.delete(c);
		return true;
	}
	
	private int getMinNumber(int x, int y) {
		if (x < y)
			return x;
		return y;
	}
	
	@Override
	public Cart refresh(Cart cart) {
		int cartQuantity = cart.getQuantity();
		
		List<Orders> orderList = orderRepository.findOrdersWithoutStatus(CANCELED_ORDER_STATUS);
		//GET ORDERED PRODUCT QUANTITY
		int orderedQuantity = 0;
		
		Product product = cart.getProduct();
		
		//CALCULATE ORDERED QUANTITY
		if (orderList != null)
			for (Orders orders : orderList)
				for (OrderDetail orderDetail : orders.getOrderDetails())
					if (orderDetail.getProductId().equals(product.getId()))
						orderedQuantity += orderDetail.getQuantity();
		
		//GET AVAILABLE QUANTITY OF PRODUCT
		int availableQuantity = product.getQuantity() - orderedQuantity;
		
		cart.setQuantity(getMinNumber(cartQuantity, availableQuantity));
		
		return cart;
	}



	
	
}
