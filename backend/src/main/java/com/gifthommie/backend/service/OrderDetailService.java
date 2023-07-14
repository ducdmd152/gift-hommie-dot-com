package com.gifthommie.backend.service;

import java.util.List;

import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.User;

public interface OrderDetailService {
	
	public List<OrderDetail> getOrderDetailsByProductId(int productId);
	
	public List<OrderDetail> addOrderDetail(CheckOutDTO checkOutDTO, int orderId,Orders order,User user);

	public OrderDetail save(OrderDetail od);
	
}
