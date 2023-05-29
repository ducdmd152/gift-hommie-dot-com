package com.gifthommie.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService{
	@Autowired
	OrderRepository orderRepository;
	
	@Override
	public Orders getOrderByOrderId(Integer orderId) {
		return orderRepository.findOrderByOrderId(orderId);
	}

}
