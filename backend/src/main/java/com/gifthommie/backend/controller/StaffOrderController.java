package com.gifthommie.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.OrderService;

@RestController
@RequestMapping("/staff/orders")
public class StaffOrderController {
	@Autowired
	OrderService orderService;
	
	@GetMapping("/{orderId}")
	public List<OrderDetail> viewOrderDetail(@PathVariable int orderId) {
		
		Orders order = orderService.getOrderByOrderId(orderId);
		if (order == null)
			throw new NotFoundException("ORDER CANNOT BE FOUND");
		return order.getOrderDetails();
		
	}
}
