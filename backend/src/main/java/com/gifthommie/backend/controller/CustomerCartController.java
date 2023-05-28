package com.gifthommie.backend.controller;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CartRequestDTO;
import com.gifthommie.backend.entity.Cart;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Product;
//import com.gifthommie.backend.entity.Cart;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.CartService;
import com.gifthommie.backend.service.OrderDetailService;
import com.gifthommie.backend.service.ProductService;
//import com.gifthommie.backend.service.CartService;
import com.gifthommie.backend.utils.SecurityUtils;

@RestController
@RequestMapping("customer/cart")
public class CustomerCartController {
	@Autowired
	CartService cartService;

	@Autowired
	ProductService productService;

	@Autowired
	OrderDetailService orderDetailService;

	private final int DEFAULT_QUANTITY = 1;
	private final int ORDER_CANCEL_STATUS = 0;

	private int getAvailableProductQuantity(int productId) {

		List<OrderDetail> orderDetailList = orderDetailService.getOrderDetailByProductIdWithoutStatus(productId,
				ORDER_CANCEL_STATUS);

		int availableQuantity = 0;

		for (OrderDetail orderDetail : orderDetailList)
			availableQuantity += orderDetail.getQuantity();

		return availableQuantity - productService.getProductById(productId).getQuantity();
	}

	// http://localhost:8080/customer/cart
	@GetMapping
	public APIPageableResponseDTO<Cart> getCartList(@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			@RequestParam(defaultValue = "", name = "search") String search) {
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		return cartService.getPagableCart(pageNo, pageSize, email);
	}

	@GetMapping("/{cartId}")
	public Cart getCart(@PathVariable int cartId) {
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		Cart existCart = cartService.getCartByEmailAndCartId(email, cartId);
		if (existCart == null)
			throw new NotFoundException("Not found cart - " + cartId);
		return existCart;
	}

	@DeleteMapping("/{cartId}")
	public boolean deleteCart(@PathVariable int cartId) {
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		Cart existCart = cartService.getCartByEmailAndCartId(email, cartId);
		if (existCart == null) {
			throw new NotFoundException("Not found cart - " + cartId);
		} else {
			return cartService.deleteCart(email, cartId);
		}
	}

	// ADD TO CART
	@PostMapping
	public Cart addToCart(@RequestBody CartRequestDTO cartInfo) {
		// Get LOGIM USER
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		// GET PRODUCT ID
		Integer productId = cartInfo.getProductId();

//		Integer quantity = cartInfo.getQuantity();
		// GET EXIST CART
		Cart existCart = cartService.getCartByEmailAndProductId(email, productId);

		int availableQuantity = getAvailableProductQuantity(productId);

		// PRODUCT IS EXIST
		if (existCart != null) {
			// INCREASE one quantity
			existCart.setQuantity(existCart.getQuantity() + 1);
			
			if (availableQuantity < existCart.getQuantity())
				throw new RuntimeException("QUANTITY CANNOT MORE THAN AVAILABLE QUANTITY");

			return cartService.save(existCart);
		}
		// GET PRODUCT BY ID
		Product product = productService.getProductById(productId);
		existCart = new Cart();
		// SET INFOMATION FOR CART
		existCart.setQuantity(DEFAULT_QUANTITY);
		existCart.setProduct(product);
		existCart.setEmail(email);

		if (availableQuantity < existCart.getQuantity())
			throw new RuntimeException("QUANTITY CANNOT MORE THAN AVAILABLE QUANTITY");

		return cartService.save(existCart);
	}

	@PutMapping
	public Cart editCartQuantity(@RequestBody CartRequestDTO cartDTO) {
		// GET LOGIN EMAIL
		String email = SecurityUtils.getPrincipal().getUser().getEmail();
		// GET PRODUCT ID
		int productId = cartDTO.getProductId();
		int availableQuantity = getAvailableProductQuantity(productId);
		
		Cart cart = cartService.getCartByEmailAndCartId(email, productId);
		// SET NEW QUANTITY FOR CART
		cart.setQuantity(cartDTO.getQuantity());
		
		if (availableQuantity < cart.getQuantity())
			throw new RuntimeException("QUANTITY CANNOT MORE THAN AVAILABLE QUANTITY");
		
		return cartService.save(cart);
	}

}
