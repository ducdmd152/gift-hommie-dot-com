package com.gifthommie.backend.service;

import java.util.List;

import com.gifthommie.backend.dto.CartRequestDTO;
import com.gifthommie.backend.entity.OrderDetail;

public interface OrderDetailService {
	
	public List<OrderDetail> getOrderDetailsByProductId(int productId);
	
	public void addOrderDetail(List<CartRequestDTO> cartList, int orderId);
	
}
