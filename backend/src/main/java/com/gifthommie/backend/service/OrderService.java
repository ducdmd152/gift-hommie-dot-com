package com.gifthommie.backend.service;

import java.util.List;

import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.entity.Orders;

public interface OrderService {
	
	public Orders getOrderByOrderId(Integer orderId);
	
	public List<Orders> getOrderListWithoutStatus(String[] tmp);
	
	public OrderResponseDTO save(CheckOutDTO checkOutDTO, String email,Float totalPrice);
}
