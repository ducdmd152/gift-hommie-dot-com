package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.service.OrderService;

@RestController
@RequestMapping("/staff/orders")
public class StaffOrderController {
	@Autowired
	OrderService orderService;
	/// ------- NOTICE ------------- ///
	// Make sure name Orders Table in Database is Order
	// Make sure collum "status" in  Orders Table have data  [PENDING, CONFIRMED, DELIVERYING, SUCCSESSFUL, CANCELED]
	
	
	// Get Order of Customer Pageable Without status              http://localhost:8080/staff/orders
	// Get Order of Customer Pageable satus is PENDING            http://localhost:8080/staff/orders?status=PENDING
	// Get Order of Customer Pageable satus is CONFIRMED          http://localhost:8080/staff/orders?status=CONFIRMED
	// Get Order of Customer Pageable satus is DELIVERYING        http://localhost:8080/staff/orders?status=DELIVERYING
	// Get Order of Customer Pageable satus is SUCCSESSFUL        http://localhost:8080/staff/orders?status=SUCCSESSFUL
	// Get Order of Customer Pageable satus is CANCELED           http://localhost:8080/staff/orders?status=CANCELED
	@GetMapping
	public APIPageableResponseDTO<Orders> getOrdersWithStatus (
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			@RequestParam(defaultValue = "", name = "status") String status){
		return orderService.getPageableOrder(pageNo, pageSize, status);
	}
	
	
	
}
