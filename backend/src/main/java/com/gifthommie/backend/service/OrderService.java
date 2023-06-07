package com.gifthommie.backend.service;

import java.util.List;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;

public interface OrderService {
	
	public Orders getOrderByOrderId(Integer orderId);
	
	public List<Orders> getOrderListWithoutStatus(String[] tmp);
	
	APIPageableResponseDTO<Orders> getPageableOrder(Integer pageNo, Integer pageSize, String status);
}
