package com.gifthommie.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.entity.Order;
import com.gifthommie.backend.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService{
	@Autowired
	OrderRepository orderRepository;
	
	@Override
	public Optional<Order> getOrderByOrderId(Integer orderId) {
		return orderRepository.findOrderByOrderId(orderId);
	}

}
