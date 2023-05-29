package com.gifthommie.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.repository.OrderDetailRepository;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{
	@Autowired
	OrderDetailRepository orderDetailRepository;

	@Override
	public List<OrderDetail> getOrderDetailsByProductId(int productId) {
		return orderDetailRepository.getOrderDetailsByProductId(productId);
	}

}
