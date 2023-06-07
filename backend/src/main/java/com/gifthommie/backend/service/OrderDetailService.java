package com.gifthommie.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.OrderDetail;
import com.mysql.cj.x.protobuf.MysqlxCrud.Order;

public interface OrderDetailService {
	
	public List<OrderDetail> getOrderDetailsByProductId(int productId);
	
	public Page<Order> findOderByStatus(@Param("status") boolean status, Pageable pageable);
	
}
