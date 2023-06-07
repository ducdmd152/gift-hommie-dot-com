package com.gifthommie.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService{
	@Autowired
	OrderRepository orderRepository;
	
	@Override
	public Orders getOrderByOrderId(Integer orderId) {
		return orderRepository.findOrderByOrderId(orderId);
	}

	@Override
	public List<Orders> getOrderListWithoutStatus(String[] tmp) {
		return orderRepository.findOrdersWithoutStatus(tmp);
	}

	@Override
	public APIPageableResponseDTO<Orders> getPageableOrder(Integer pageNo, Integer pageSize, String status) {
		Page<Orders> page  = orderRepository.getOrderedWithStatus(status, PageRequest.of(pageNo, pageSize));
		return new APIPageableResponseDTO<Orders>(page);
	}

	

}
