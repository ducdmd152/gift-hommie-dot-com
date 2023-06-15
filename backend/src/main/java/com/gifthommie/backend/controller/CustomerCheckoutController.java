package com.gifthommie.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.CartRequestDTO;
import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.OrderDetailDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.UserRepository;
import com.gifthommie.backend.service.CartService;
import com.gifthommie.backend.service.OrderDetailService;
import com.gifthommie.backend.service.OrderService;
import com.gifthommie.backend.service.ProductService;
import com.gifthommie.backend.service.UserService;
import com.gifthommie.backend.utils.SecurityUtils;

@RestController
@RequestMapping("/customer/checkout")
public class CustomerCheckoutController {
	
	@Autowired
	CartService cartService;
	
	@Autowired
	OrderDetailService orderDetailService;
	
	@Autowired
	OrderService orderService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ProductService productService;
	
	@PostMapping
	public OrderDTO cartCheckOut(@RequestBody CheckOutDTO checkOutDTO) {
		
		//refresh before check out
		//OrderResponseDTO
		User user = SecurityUtils.getPrincipal().getUser();
		String email = user.getEmail();
		
		Orders tmpOrder = orderService.save(checkOutDTO, email);
		
		
		int orderID = tmpOrder.getId();
		
		User tmpUser = userService.getUserByEmail(email);
		//OrderDTO tmpOrderDTO = orderDetailService.addOrderDetail(checkOutDTO, orderID, tmpOrder, tmpUser);
		
		//cartService.deleteCartTrasit(checkOutDTO.getCarts(), email);
		List<OrderDetail> orderDetails = orderDetailService.addOrderDetail(checkOutDTO, orderID, tmpOrder, tmpUser);
		List<OrderDetailDTO> orderDetailDTOs = new ArrayList<>();
		for (OrderDetail tmp : orderDetails) {
			orderDetailDTOs.add(new OrderDetailDTO(tmp,productService.getProductById(tmp.getProductId()) ));
		}
		OrderDTO tmpOrderDTO = new OrderDTO(tmpOrder, user, orderDetailDTOs);
		cartService.deleteCartTrasit(checkOutDTO.getCarts(), email);
		return tmpOrderDTO;
	
	}
}
