package com.gifthommie.backend.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableDTO;
import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.OrderDetailDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.OrderDetailRepository;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.repository.UserRepository;
import com.mysql.cj.x.protobuf.MysqlxCrud.Order;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	OrderRepository orderRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	OrderDetailRepository orderDetailRepository;
	private final String ORDER_PENDING_STATUS = "PENDING";
	@Autowired
	ProductService productService;

	@Override
	public Orders getOrderByOrderId(Integer orderId) {
		Orders order = orderRepository.findOrderByOrderId(orderId) ;
		return updateStatus(order);
	}

	@Override
	public List<Orders> getOrderListWithoutStatus(String[] tmp) {
		return orderRepository.findOrdersWithoutStatus(tmp);
	}

	@Override
	public Orders save(CheckOutDTO checkOutDTO, String email) {
//		Orders order = new Orders();
//		order.setEmail(email);
//		order.setOrderTime(LocalDateTime.now());
//		order.setStatus(ORDER_PENDING_STATUS);
//		order.setLastUpdatedTime(LocalDateTime.now());
//		orderRepository.save(order);
//		
//		OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
//		orderResponseDTO.setId(order.getId());
//		orderResponseDTO.setOrderTime(order.getOrderTime());
//		orderResponseDTO.setTotalPrice(totalPrice);
//		
//		return orderResponseDTO;
//		Orders order = new Orders(checkOutDTO,email);
//		orderRepository.save(order);
//		OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
//		orderResponseDTO.setId(order.getId());
//		orderResponseDTO.setOrderTime(order.getOrderTime());

		Orders order = new Orders(checkOutDTO, email);
		String extendAddress = checkOutDTO.getWardName() + ", \n" + checkOutDTO.getDistrictName() + ", \n" + checkOutDTO.getProvinceName();
		order.setAddress(checkOutDTO.getAddress() + ", \n" + extendAddress);
		orderRepository.save(order);

		return order;
	}

	@Override
	public APIPageableResponseDTO<Orders> getOrderList(Integer pageNo, Integer pageSize, String email) {
		Page<Orders> page = orderRepository.findAllByEmail(email, PageRequest.of(pageNo, pageSize));
		return new APIPageableResponseDTO<Orders>(page);
	}

	private OrderDTO convertToDTO(Orders orders) {
		OrderDTO orderDTO = new OrderDTO(orders);
		return orderDTO;
	}

	@Override
	public OrderDTO getOrderDTOByOrderId(int orderId) {
		Orders order = getOrderByOrderId(orderId);
		order = updateStatus(order);
		OrderDTO orderDTO = new OrderDTO(order);
		User tmpUser = userRepository.getUserByEmail(order.getEmail()); // GET USER
		
		List<OrderDetailDTO> orderDetailDTOs = new ArrayList(); // CONVERT DETAILS TO DETAIL-DTOs
		for(OrderDetail orderDetail : order.getOrderDetails()) {				
			Product product = productService.getProductById(orderDetail.getProductId());
			orderDetailDTOs.add(new OrderDetailDTO(orderDetail, product));
		}
			
		
		// SET
		orderDTO.setUser(tmpUser);
		orderDTO.setOrderDetails(orderDetailDTOs);
		return orderDTO;
	}
	
	@Override
    public APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail(Integer pageNo, Integer pageSize) {
		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("orderTime").descending()); // MODIFIED BY DUY DUC
        Page<Orders> page = orderRepository.findAll( pageable);
//        List<OrderDTO> orderList = page.getContent().stream().map(this::convertToDTO).collect(Collectors.toList());
        List<OrderDTO> orderDTOList = new ArrayList<>();
        for (Orders order : page) {
        	order = updateStatus(order);
            OrderDTO orderDTO = new OrderDTO(order);

            User tmpUser = userRepository.getUserByEmail(order.getEmail()); // GET USER

            List<OrderDetailDTO> orderDetailDTOs = new ArrayList<OrderDetailDTO>(); // CONVERT DETAILS TO DETAIL-DTOs
            ;
            for(OrderDetail orderDetail : order.getOrderDetails()) {
                Product product = productService.getProductById(orderDetail.getProductId());
                orderDetailDTOs.add(new OrderDetailDTO(orderDetail, product));
            }


            // SET
            orderDTO.setUser(tmpUser);
            orderDTO.setOrderDetails(orderDetailDTOs);

            orderDTOList.add(orderDTO);
        }

        APIPageableResponseDTO<OrderDTO> apiResponse = new APIPageableResponseDTO<>();
        apiResponse.setContent(orderDTOList);
        APIPageableDTO apiPageble = new APIPageableDTO(page);
        apiResponse.setPageable(apiPageble);
        return apiResponse;
    }
	
	@Override
    public APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail(Integer pageNo, Integer pageSize, String status) {
		if(status == null)
			return getOrderDTOList_noEmail(pageNo, pageSize);
		
		List<String> statuses = new ArrayList<>();
		if(status.toLowerCase().equals("others")) {
			statuses.add("CANCELLED");
			statuses.add("REFUSED");		
        }
		else {
			statuses.add(status);
		}
		
		
        Page<Orders> page = orderRepository.findAllWithStatus(statuses, PageRequest.of(pageNo, pageSize));
        
        
        
//        List<OrderDTO> orderList = page.getContent().stream().map(this::convertToDTO).collect(Collectors.toList());
        List<OrderDTO> orderDTOList = new ArrayList<>();
        for (Orders order : page) {
        	order = updateStatus(order);
            OrderDTO orderDTO = new OrderDTO(order);

            User tmpUser = userRepository.getUserByEmail(order.getEmail()); // GET USER

            List<OrderDetailDTO> orderDetailDTOs = new ArrayList<OrderDetailDTO>(); // CONVERT DETAILS TO DETAIL-DTOs
            ;
            for(OrderDetail orderDetail : order.getOrderDetails()) {
                Product product = productService.getProductById(orderDetail.getProductId());
                orderDetailDTOs.add(new OrderDetailDTO(orderDetail, product));
            }


            // SET
            orderDTO.setUser(tmpUser);
            orderDTO.setOrderDetails(orderDetailDTOs);

            orderDTOList.add(orderDTO);
        }

        APIPageableResponseDTO<OrderDTO> apiResponse = new APIPageableResponseDTO<>();
        apiResponse.setContent(orderDTOList);
        APIPageableDTO apiPageble = new APIPageableDTO(page);
        apiResponse.setPageable(apiPageble);
        return apiResponse;
    }
	
	@Override
	public APIPageableResponseDTO<OrderDTO> getOrderDTOList(Integer pageNo, Integer pageSize, String email, String status) {
		Page<Orders> page = null;
		
		if(status == null) {
			page = orderRepository.findAllByEmail(email, PageRequest.of(pageNo, pageSize));
		}
		else {
			List<String> statuses = new ArrayList<>();
			if(status.toLowerCase().equals("others")) {
				statuses.add("CANCELLED");
				statuses.add("REFUSED");		
	        }
			else {
				statuses.add(status);
			}
			page = orderRepository.findAllByEmailWithStatus(email, statuses, PageRequest.of(pageNo, pageSize));
		}
		
		
		
		
//		List<OrderDTO> orderList = page.getContent().stream().map(this::convertToDTO).collect(Collectors.toList());
		List<OrderDTO> orderDTOList = new ArrayList<>();
		for (Orders order : page) {
			order = updateStatus(order);
			OrderDTO orderDTO = new OrderDTO(order);
			
			User tmpUser = userRepository.getUserByEmail(email); // GET USER
			
			List<OrderDetailDTO> orderDetailDTOs = new ArrayList(); // CONVERT DETAILS TO DETAIL-DTOs
			;
			for(OrderDetail orderDetail : order.getOrderDetails()) {				
				Product product = productService.getProductById(orderDetail.getProductId());
				orderDetailDTOs.add(new OrderDetailDTO(orderDetail, product));
			}
				
			
			// SET
			orderDTO.setUser(tmpUser);
			orderDTO.setOrderDetails(orderDetailDTOs);
			
			orderDTOList.add(orderDTO);
		}
		
		APIPageableResponseDTO<OrderDTO> apiResponse = new APIPageableResponseDTO<>();
		apiResponse.setContent(orderDTOList);
		APIPageableDTO apiPageble = new APIPageableDTO(page);
		apiResponse.setPageable(apiPageble);
		return apiResponse;
	}

	@Override
	public void setStatusOfOrderById(int orderId, String status) {
		orderRepository.setStatusOfOrderByOrderId(orderId, status);
	}

	@Override
	public APIPageableResponseDTO<Orders> getPageableOrder(Integer pageNo, Integer pageSize, String status) {
		Page<Orders> page = orderRepository.getOrderedWithStatus(status, PageRequest.of(pageNo, pageSize));
		return new APIPageableResponseDTO<Orders>(page);
	}

	@Override
	public Orders save(Orders order) {
		return orderRepository.save(order);
	}

	// MOCK ~ API FOR UPDATING ORDER STATUS FROM THE DELIVERYING SERVICE
	private long getTimeMillis(LocalDateTime time) {
		//return time.getLong(null);
		return time.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
	}
	public Orders updateStatus(Orders order) {
		if(order.getStatus().toUpperCase().equals("PENDING"))
			return order;
		if(order.getStatus().toUpperCase().equals("REFUSED"))
			return order;
		if(order.getStatus().toUpperCase().equals("CANCELLED"))
			return order;
		if(order.getStatus().toUpperCase().equals("SUCCESSFUL"))
			return order;
		if(order.getStatus().toUpperCase().equals("FAIL"))
			return order;
		
		long exp = getTimeMillis(order.getExpectedDeliveryTime());
		long cur = System.currentTimeMillis();
		long ort = getTimeMillis(order.getOrderTime());
		
		long part = (exp - ort)/10;
		long currentPart = (cur - ort)/part;
		
		if(currentPart>=1)
			order.setStatus("DELIVERYING");
		
		if(currentPart>=6)
			if(Math.random()%10 == 4) // 1:10 FOR DELIVERYING EARLY
				order.setStatus(Math.random()%10 == 1 ? "FAIL" : "SUCCESSFUL"); // 1:10 => FAIL
				
		return save(order);
	}
}
