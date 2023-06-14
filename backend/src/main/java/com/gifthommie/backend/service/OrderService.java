package com.gifthommie.backend.service;

import java.util.List;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.entity.Orders;

public interface OrderService {
	
	public Orders getOrderByOrderId(Integer orderId);
	
	public List<Orders> getOrderListWithoutStatus(String[] tmp);
	
	public Orders save(CheckOutDTO checkOutDTO, String email);
	
	public APIPageableResponseDTO<Orders> getOrderList(Integer pageNo, Integer pageSize, String email);

	public void setStatusOfOrderById(int orderId, String status);
	
	APIPageableResponseDTO<Orders> getPageableOrder(Integer pageNo, Integer pageSize, String status);
	
	public void save(Orders order);
}
