package com.gifthommie.backend.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CartRequestDTO;
import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.dto.FeedbackDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.OrderDetailDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.OrderDetailRepository;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
	@Autowired
	ProductService productService;
	@Autowired
	OrderService orderService;
	@Autowired
	UserService userService;
	
	@Autowired
	OrderDetailRepository orderDetailRepository;
	@Override
	public List<OrderDetail> getOrderDetailsByProductId(int productId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<OrderDetail> addOrderDetail(CheckOutDTO checkOutDTO,int orderId,Orders order,User user) {
		
//		List<OrderDetailDTO> orderDetailDTO = new ArrayList<>() ;
//		int tmpProductID ;
//		for (CartRequestDTO cartRequestDTO : checkOutDTO.getCarts()) {
//			//tmpProductID=cartRequestDTO.getProductId();
//			tmpProductID = 11;
//			Product product = productService.getProductById(tmpProductID);
//			OrderDetail orderDetail = new OrderDetail(orderId,tmpProductID
//					,product.getPrice()
//					,cartRequestDTO.getQuantity());
//			
//			OrderDetailDTO tmpOrder = new OrderDetailDTO(orderDetail,productService.getProductById(tmpProductID));
//			orderDetailDTO.add(tmpOrder);
//			orderDetailRepository.save(orderDetail);
//		}
//		
//		return new OrderDTO(order,user,orderDetailDTO);
		
		//test get product
		
		
		List<OrderDetail> orderDetails = new ArrayList<>();
		for(CartRequestDTO tmp : checkOutDTO.getCarts()) {
			Product tmpProduct = productService.getProductById(tmp.getProductId());
			OrderDetail orderDetail = new OrderDetail(orderId, tmpProduct.getId(), tmpProduct.getPrice(), tmp.getQuantity());
			orderDetails.add(orderDetail);
			orderDetailRepository.save(orderDetail);
		}
		
		return orderDetails;
		
	}

	@Override
	public OrderDetail save(OrderDetail orderDetail) {
		return orderDetailRepository.save(orderDetail);
	}


}
