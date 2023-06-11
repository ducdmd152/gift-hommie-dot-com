package com.gifthommie.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService{
	@Autowired
	OrderRepository orderRepository;
	
	private final String ORDER_PENDING_STATUS = "PENDING";
	
	@Override
	public Orders getOrderByOrderId(Integer orderId) {
		return orderRepository.findOrderByOrderId(orderId);
	}

	@Override
	public List<Orders> getOrderListWithoutStatus(String[] tmp) {
		return orderRepository.findOrdersWithoutStatus(tmp);
	}

	@Override
	public OrderResponseDTO save(CheckOutDTO checkOutDTO,String email) {
//		Orders order = new Orders();
//		order.setEmail(email);
//		order.setOrderTime(LocalDateTime.now());
//		order.setStatus(ORDER_PENDING_STATUS);
//		order.setLastUpdatedTime(LocalDateTime.now());
//		orderRepository.save(order);
//		
//		OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
//		orderResponseDTO.setId(order.getId());
//		orderResponseDTO.setOrderTime(order.getOrderTime());
//		orderResponseDTO.setTotalPrice(totalPrice);
//		
//		return orderResponseDTO;
		Orders order = new Orders(checkOutDTO,email);
		orderRepository.save(order);
		OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
		orderResponseDTO.setId(order.getId());
		orderResponseDTO.setOrderTime(order.getOrderTime());
		
		return orderResponseDTO;
	}

}
