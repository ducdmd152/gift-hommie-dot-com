package com.gifthommie.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.CartRequestDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.repository.OrderDetailRepository;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
	@Autowired
	ProductService productService;
	
	@Autowired
	OrderDetailRepository orderDetailRepository;
	@Override
	public List<OrderDetail> getOrderDetailsByProductId(int productId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addOrderDetail(List<CartRequestDTO> cartList,int orderId) {
		for (CartRequestDTO cartRequestDTO : cartList) {
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setOrderId(orderId);
			orderDetail.setProductId(cartRequestDTO.getProductId());
			orderDetail.setPrice(productService.getProductById(orderId).getPrice());
			orderDetailRepository.save(orderDetail);
		}
		
	}

}
