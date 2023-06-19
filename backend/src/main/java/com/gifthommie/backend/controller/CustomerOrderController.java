package com.gifthommie.backend.controller;

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
import com.gifthommie.backend.dto.RatingRequestDTO;
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
	
	//UPDATE ORDER
	@PutMapping("/{orderId}")
	public OrderDTO updateOrder(@PathVariable Integer orderId, 
						@RequestBody OrderDTO orderDTO) {
		Orders order = orderService.getOrderByOrderId(orderId);
		//IF CANNOT FIND THE ORDER BY ID
		
		if (order == null)
			throw new NotFoundException("ORDER CANNOT BE FOUND");
		
//		Orders update = new Orders(orderDTO);
		order.autoUpdateFromDTO(orderDTO);
		
		return new OrderDTO(orderService.save(order));
	}
	
	@PostMapping("/rating")
	public void ratingOrder(@RequestBody RatingRequestDTO ratingRequestDTO) {
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		reviewService.save(ratingRequestDTO, email);
	}
}
