package com.gifthommie.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CartRequestDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.service.CartService;
import com.gifthommie.backend.service.OrderDetailService;
import com.gifthommie.backend.service.OrderService;
import com.gifthommie.backend.service.ProductService;
import com.gifthommie.backend.utils.SecurityUtils;

@RestController
@RequestMapping("/customer/order")
public class CustomerOrderController {
	@Autowired
	CartService cartService;

	@Autowired
	ProductService productService;
	
	@Autowired
	OrderService orderService;
	
	@Autowired
	OrderDetailService orderDetailService;
	
	@GetMapping
	public APIPageableResponseDTO<Orders> getOrderList(@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize){
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		return orderService.getOrderList(pageNo, pageSize, email);
	}
	
	@PostMapping
	public OrderResponseDTO cartCheckOut(@RequestBody List<CartRequestDTO> cartList) {
		
		//refresh before check out
		
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		float totalPrice = 0; 
		totalPrice = productService.totalPrice(cartList);
		OrderResponseDTO newOrder = orderService.save(totalPrice,email);
		int orderId = newOrder.getId();
		orderDetailService.addOrderDetail(cartList, orderId);
		cartService.deleteCartTrasit(cartList, email);
		return newOrder;
	}
	
}
