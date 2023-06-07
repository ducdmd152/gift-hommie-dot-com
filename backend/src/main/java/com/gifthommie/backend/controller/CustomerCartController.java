package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CartResponseDTO;
import com.gifthommie.backend.entity.Cart;
import com.gifthommie.backend.entity.Product;
//import com.gifthommie.backend.entity.Cart;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.CartService;
import com.gifthommie.backend.service.OrderService;
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
	OrderService orderService;

	private final int DEFAULT_QUANTITY = 1;
	private final String ORDER_CANCEL_STATUS = "CANCEL";

	// http://localhost:8080/customer/cart
	@GetMapping
	public APIPageableResponseDTO<CartResponseDTO> getCartList(@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
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

	@DeleteMapping("/{productId}")
	public boolean deleteCart(@PathVariable int productId) {
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		Cart existProduct = cartService.getCartByEmailAndProductId(email, productId);
		if (existProduct == null) {
			throw new NotFoundException("Not found item - " + productId);
		} else {
			return cartService.deleteCart(email, productId);
		}
	}

	// ADD TO CART
	@PostMapping("/{productId}")
	public CartResponseDTO addToCart(@PathVariable int productId, 
			@RequestParam(defaultValue = "1", name = "quantity") int defaultQuantity) {
		// Get LOGIM USER
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		// GET PRODUCT ID

		// GET EXIST CART
		Cart existCart = cartService.getCartByEmailAndProductId(email, productId);

		// PRODUCT IS EXIST
		if (existCart != null) {
			// INCREASE one quantity
			existCart.setQuantity(existCart.getQuantity() + defaultQuantity);
			
			return new CartResponseDTO(cartService.save(existCart));
		}
		// GET PRODUCT BY ID
		Product product = productService.getProductById(productId);
		existCart = new Cart();
		
		// SET INFOMATION FOR CART
		existCart.setQuantity(defaultQuantity);
		existCart.setProduct(product);
		existCart.setEmail(email);

		return new CartResponseDTO(cartService.save(existCart));
	}

	@PutMapping("/{productId}")
	public CartResponseDTO editCartQuantity(@PathVariable int productId, 
			@RequestParam("quantity") int newQuantity) {
		// GET LOGIN EMAIL
		String email = SecurityUtils.getPrincipal().getUser().getEmail();
		// GET CART ID

		Cart cart = cartService.getCartByEmailAndProductId(email, productId);

		if (cart == null)
			throw new RuntimeException("PRODUCT IS NOT EXIST IN CART");
		
//		SET NEW QUANTITY FOR CART
		cart.setQuantity(newQuantity);

		return new CartResponseDTO(cartService.save(cart));
	}

}
