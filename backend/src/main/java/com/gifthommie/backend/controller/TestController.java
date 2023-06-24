package com.gifthommie.backend.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.ProductStatisticDTO;
import com.gifthommie.backend.dto.ProductStatisticDTO.Day;
import com.gifthommie.backend.dto.ProductStatisticDTO.ProductStatisticValue;
import com.gifthommie.backend.entity.Category;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.repository.CategoryRepository;
import com.gifthommie.backend.repository.OrderDetailRepository;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.service.FeedbackService;
import com.gifthommie.backend.service.OrderService;
import com.gifthommie.backend.service.ProductStatisticService;
import com.gifthommie.backend.service.RevenueService;
import com.gifthommie.backend.utils.SecurityUtils;

@RestController
public class TestController {
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	OrderRepository orderRepository;
	@Autowired
	FeedbackService feedbackService;
	@Autowired
	OrderDetailRepository orderDetailRepository;
	@Autowired
	RevenueService revenueService;
	@Autowired
	ProductStatisticService productStatisticService;
	
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
	
	@GetMapping("public/test-feedback")
	public String getFeedback() {
//		return orderDetailRepository.findOrderDetailsByProductId(PageRequest.of(1, 12), 59);
		return "123";
	}
	
//	@GetMapping("public/test-revenue")
//	public Double getRevenue() {
//        String startString = "2023-06-15 00:00:00";
//        
//		return revenueService.getRevenueOfQuarter(startString);
//	}
	
//	@GetMapping("public/test-product-statistic")
//	public Day getProductStatisic() {
//		
//		return productStatisticService.("2023-06-14 00:00:00");
//		
//	}
	
	@GetMapping("public/test-formetdate")
	public String getDate() {
		LocalDateTime nowDate = LocalDateTime.now();
		
        // Format the LocalDateTime object
		return DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(nowDate);
	}
	
}
