package com.gifthommie.backend.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.OrderStatisticsDTO;
import com.gifthommie.backend.dto.ProductStatisticDTO;
import com.gifthommie.backend.dto.RevenueDTO;
import com.gifthommie.backend.dto.UserStatisticsDTO;
import com.gifthommie.backend.dto.UserStatisticsDTO.UserTopOrderDTO;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.service.OrderService;
import com.gifthommie.backend.service.ProductStatisticService;
import com.gifthommie.backend.service.RevenueService;
import com.gifthommie.backend.service.UserService;

@RestController
@RequestMapping("/manager/statistic")
public class ManagerStatisticController {
	@Autowired
	RevenueService revenueService;
	
	@Autowired 
	OrderService orderService;
	
	@Autowired
	ProductStatisticService productStatisticService;
	
	@Autowired
	UserService userService;
	@GetMapping("/revenue")
	public RevenueDTO getRevenue(@RequestParam(defaultValue = "", name = "date") String date) {
		if (date.isEmpty())
			date = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDateTime.now());
		
		return revenueService.getRevenue(date + " 00:00:00");
	}
	
	@GetMapping("/order")
	public OrderStatisticsDTO getOrderStatisticsDTO(@RequestParam(defaultValue = "", name = "date") String date) {
		if (date.isEmpty())
			date = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDateTime.now());
		
		return orderService.getOrderStatistic(date + " 00:00:00");
	}
	
	@GetMapping("/product")
	public ProductStatisticDTO getProductStatisticsDTO(@RequestParam(defaultValue = "", name = "date") String date) {
		if (date.isEmpty())
			date = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDateTime.now());
		
		return productStatisticService.getProductStatistic(date + " 00:00:00");
	}
	
	@GetMapping("/user")
	public UserStatisticsDTO getUserStatisticDTO(@RequestParam(defaultValue = "", name = "date") String date) {
		if (date.isEmpty())
			date = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDateTime.now());
		return userService.getUserStatictis(date+ " 00:00:00");
	}
	
	@Autowired
	private OrderRepository orderRepository; // Team BE refactorying lai thanh service nhe
	@GetMapping("/today/order/successful")
    public List<Orders> getOrderList(
    		@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
            @RequestParam(defaultValue = "12", name = "size") Integer pageSize){
		LocalDateTime start = LocalDate.now().atTime(0, 0, 0);
		LocalDateTime end = LocalDate.now().atTime(23, 59, 59);
		
		List<Orders> orders = orderRepository.findSuccessfulOrdersFromTo(start, end);
		return orders;
    }
}
