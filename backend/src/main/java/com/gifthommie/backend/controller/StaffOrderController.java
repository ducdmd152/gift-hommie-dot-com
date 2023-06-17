package com.gifthommie.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.service.OrderService;
import com.gifthommie.backend.utils.SecurityUtils;

@RestController
@RequestMapping("/staff/order")
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
	
	
	/// ------- NOTICE ------------- ///
		// Make sure name Orders Table in Database is Order
		// Make sure collum "status" in  Orders Table have data  [PENDING, CONFIRMED, DELIVERYING, SUCCSESSFUL, CANCELED]
		// Make sure ward_code, district_id, prodvince_id have data to avovoid error of My SQL
		
		
		// Get Order of Customer Pageable Without status              http://localhost:8080/staff/orders
		// Get Order of Customer Pageable satus is PENDING            http://localhost:8080/staff/order?status=PENDING
		// Get Order of Customer Pageable satus is CONFIRMED          http://localhost:8080/staff/order?status=CONFIRMED
		// Get Order of Customer Pageable satus is DELIVERYING        http://localhost:8080/staff/order?status=DELIVERYING
		// Get Order of Customer Pageable satus is SUCCSESSFUL        http://localhost:8080/staff/order?status=SUCCSESSFUL
		// Get Order of Customer Pageable satus is CANCELED           http://localhost:8080/staff/order?status=CANCELED
//		@GetMapping
//		public APIPageableResponseDTO<Orders> getOrdersWithStatus (
//				@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
//				@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
//				@RequestParam(defaultValue = "", name = "status") String status){
//			return orderService.getPageableOrder(pageNo, pageSize, status);
//		}
	
	@GetMapping
	public APIPageableResponseDTO<OrderDTO> getOrderList(@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize){
//		User user = SecurityUtils.getPrincipal().getUser();
		//String email = user.getEmail();
		
		return orderService.getOrderDTOList_noEmail(pageNo, pageSize);
	}

	
	@PutMapping("/{orderID}")
	public void updateOrderState(@PathVariable int orderID,@RequestParam int status,@RequestParam String comment) {
		
		String STATUS[] = {"PENDING","CONFIRMED","DELIVERYING","SUCCESSFUL","CANCELED"};
		Orders order = orderService.getOrderByOrderId(orderID);
		if (order == null)
			throw new NotFoundException("ORDER CANNOT BE FOUND");
		if (order.getStatus().equals(STATUS[0]) || order.getStatus().equals(STATUS[1]) || order.getStatus().equals(STATUS[2])) {
			order.setStatus(STATUS[status]);
			order.setComment(comment);
			orderService.save(order);
		}
	}
}
