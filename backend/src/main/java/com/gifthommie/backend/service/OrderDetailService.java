package com.gifthommie.backend.service;

import java.util.List;

import com.gifthommie.backend.entity.OrderDetail;

public interface OrderDetailService {
	
	public List<OrderDetail> getOrderDetailByProductIdWithoutStatus(int productId, int status);
	
}