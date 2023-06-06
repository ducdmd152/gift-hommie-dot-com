package com.gifthommie.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.entity.Category;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.repository.CategoryRepository;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.utils.SecurityUtils;

@RestController
public class TestController {
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	OrderRepository orderRepository;
	
	@GetMapping("/public/test")
	public String publicx() {
		return "Welcome to APIs!!!";
	}
	@GetMapping("/customer/test")
	public String customer() {
		return "Welcome to CUSTOMER APIs!!!";
	}
	
	@GetMapping("/staff/test")
	public String staff() {
		return "Welcome to STAFF APIs!!!";
	}
	
	@GetMapping("/manager/test")
	public String manager() {
		return "Welcome to MANAGER APIs!!!";
	}
	
	@GetMapping("/public/categories")
	public List<Category> getCategories() {
		return categoryRepository.findAll();
	}
	@GetMapping("/public/test-login")
	public String testLogin() {
		return SecurityUtils.getPrincipal().getPassword();
	}
	
	@GetMapping("public/test-order")
	public Orders getOrder() {
		return orderRepository.findOrderByOrderId(3);
	}
	
	@GetMapping("public/test-order-list")
	public Integer getOrderList() {
		
		String[] tmp = {"CANCELLED", "FAIL", "REFUSED"};
		Integer ans = orderRepository.getOrderedProductQuantityWithoutStatus(6, tmp);
		
		if (ans == null)
			return 0;
		
		return ans;
	
	}
}
