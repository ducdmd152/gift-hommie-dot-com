package com.gifthommie.backend.service;

import java.util.Optional;

import com.gifthommie.backend.entity.Order;

public interface OrderService {
	
	public Optional<Order> getOrderByOrderId(Integer orderId);
	
}
