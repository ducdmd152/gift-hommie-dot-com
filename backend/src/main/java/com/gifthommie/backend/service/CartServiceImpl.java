package com.gifthommie.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
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
