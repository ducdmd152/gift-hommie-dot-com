package com.gifthommie.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CartRequestDTO;
import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.dto.RatingRequestDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.CartService;
import com.gifthommie.backend.service.OrderDetailService;
import com.gifthommie.backend.service.OrderService;
import com.gifthommie.backend.service.ProductService;
import com.gifthommie.backend.service.ReviewService;
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
	
	@Autowired
	ReviewService reviewService;
	
	private final String CANCEL_ORDER_STATUS = "CANCEL";
	
//	@GetMapping
//	public APIPageableResponseDTO<Orders> getOrderList(@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
//			@RequestParam(defaultValue = "12", name = "size") Integer pageSize){
//		User user = SecurityUtils.getPrincipal().getUser();
//		String email = user.getEmail();
//		
//		return orderService.getOrderList(pageNo, pageSize, email);
//	}
	
	@GetMapping
	public APIPageableResponseDTO<OrderDTO> getOrderList(@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize){
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		
		return orderService.getOrderDTOList(pageNo, pageSize, email);
	}
	
	
//	@GetMapping("/{orderId}")
//	public List<OrderDetail> viewOrderDetail(@PathVariable int orderId) {
//		Orders order = orderService.getOrderByOrderId(orderId);
//		
//		if (order == null)
//			throw new NotFoundException("ORDER CANNOT BE FOUND");
//		
//		return order.getOrderDetails();
//	}
	
	@GetMapping("/{orderId}")
	public OrderDTO viewOrderDetail(@PathVariable int orderId) {
		OrderDTO orderDTO = orderService.getOrderDTOByOrderId(orderId);
		
		if (orderDTO == null)
			throw new NotFoundException("ORDER CANNOT BE FOUND");
		
		return orderDTO;
	}
	
	@DeleteMapping("/{orderId}")
	public void cancelOrder(@PathVariable int orderId) {
		Orders order = orderService.getOrderByOrderId(orderId);
		
		if (order == null)
			throw new NotFoundException("ORDER CANNOT BE FOUND");
		
		if (!order.getStatus().equals("PENDING"))
			throw new RuntimeException("CANNOT CANCEL THIS ORDER");
		
		//CANCEL AN ORDER BY SET STATUS TO CANCEL
		orderService.setStatusOfOrderById(orderId, CANCEL_ORDER_STATUS);
	}
	
	@PostMapping("/rating")
	public void ratingOrder(@RequestBody RatingRequestDTO ratingRequestDTO) {
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		reviewService.save(ratingRequestDTO, email);
	}
}
