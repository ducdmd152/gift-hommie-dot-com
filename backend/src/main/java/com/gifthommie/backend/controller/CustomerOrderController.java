package com.gifthommie.backend.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.OrderDetailDTO;
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
import com.gifthommie.backend.service.UserService;
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
	
	@Autowired
	UserService userService;
	
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
	public APIPageableResponseDTO<OrderDTO> getOrderList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			 @RequestParam(name = "status", required = false) String status){
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		if(status!=null && status.isEmpty())
			status = null;
		
		return orderService.getOrderDTOList(pageNo, pageSize, email, status);
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
	
	//UPDATE ORDER
	@PutMapping("/{orderId}")
	public OrderDTO updateOrder(@PathVariable Integer orderId, 
						@RequestBody OrderDTO orderDTO) {
		Orders order = orderService.getOrderByOrderId(orderId);
		//IF CANNOT FIND THE ORDER BY ID
		
		if (order == null)
			throw new NotFoundException("ORDER CANNOT BE FOUND");
		
		boolean feedbackMode = order.isEvaluated() != orderDTO.isEvaluated();
			
//		Orders update = new Orders(orderDTO);
		order.autoUpdateFromDTO(orderDTO);
		
		// FEEDBACKMODE
		for(OrderDetail od : order.getOrderDetails())
			od.setFeedbackTime(LocalDateTime.now());
		
////		for(OrderDetailDTO od : orderDTO.getOrderDetails()) {
//		for(OrderDetail od : order.getOrderDetails()) {
////			System.out.println(od.getId() + " " + od.getRating() + " : " + od.getOrderId());
//			OrderDetail OD = orderDetailService.save(od);
////			System.out.println(OD.getId() + " " + OD.getRating());
//		}
		
		orderService.save(order);			
		
		return orderService.getOrderDTOByOrderId(orderId);
	}
	
	@PostMapping("/rating")
	public void ratingOrder(@RequestBody RatingRequestDTO ratingRequestDTO) {
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		reviewService.save(ratingRequestDTO, email);
	}
}
