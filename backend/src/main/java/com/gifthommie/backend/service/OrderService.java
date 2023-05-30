package com.gifthommie.backend.service;

import java.util.List;

import com.gifthommie.backend.entity.Orders;

public interface OrderService {
	
	public Orders getOrderByOrderId(Integer orderId);
	
}
