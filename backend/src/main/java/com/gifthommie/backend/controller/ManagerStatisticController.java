package com.gifthommie.backend.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.OrderStatisticsDTO;
import com.gifthommie.backend.dto.RevenueDTO;
import com.gifthommie.backend.service.OrderService;
import com.gifthommie.backend.service.RevenueService;

@RestController
@RequestMapping("/manager/statistic")
public class ManagerStatisticController {
	@Autowired
	RevenueService revenueService;
	
	@Autowired 
	OrderService orderService;
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
}
