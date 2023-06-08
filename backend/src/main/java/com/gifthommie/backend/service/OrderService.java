package com.gifthommie.backend.service;

import java.util.List;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.entity.Orders;

public interface OrderService {
	
	public Orders getOrderByOrderId(Integer orderId);
	
	public List<Orders> getOrderListWithoutStatus(String[] tmp);
	
	public OrderResponseDTO save(float totalPrice, String email);
	
	public APIPageableResponseDTO<Orders> getOrderList(Integer pageNo, Integer pageSize, String email);
}
