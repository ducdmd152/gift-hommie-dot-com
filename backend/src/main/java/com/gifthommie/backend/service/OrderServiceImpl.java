package com.gifthommie.backend.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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
import com.gifthommie.backend.dto.OrderStatisticsDTO;
import com.gifthommie.backend.dto.OrderStatisticsDTO.Day;
import com.gifthommie.backend.dto.RevenueDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.OrderDetailRepository;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.repository.UserRepository;

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
		Orders order = orderRepository.findOrderByOrderId(orderId);
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
		String extendAddress = checkOutDTO.getWardName() + ", \n" + checkOutDTO.getDistrictName() + ", \n"
				+ checkOutDTO.getProvinceName();
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
		for (OrderDetail orderDetail : order.getOrderDetails()) {
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
		Page<Orders> page = orderRepository.findAll(pageable);
//        List<OrderDTO> orderList = page.getContent().stream().map(this::convertToDTO).collect(Collectors.toList());
		List<OrderDTO> orderDTOList = new ArrayList<>();
		for (Orders order : page) {
			order = updateStatus(order);
			OrderDTO orderDTO = new OrderDTO(order);

			User tmpUser = userRepository.getUserByEmail(order.getEmail()); // GET USER

			List<OrderDetailDTO> orderDetailDTOs = new ArrayList<OrderDetailDTO>(); // CONVERT DETAILS TO DETAIL-DTOs
			;
			for (OrderDetail orderDetail : order.getOrderDetails()) {
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
		if (status == null)
			return getOrderDTOList_noEmail(pageNo, pageSize);

		List<String> statuses = new ArrayList<>();
		if (status.toLowerCase().equals("others")) {
			statuses.add("CANCELLED");
			statuses.add("REFUSED");
		} else {
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
			for (OrderDetail orderDetail : order.getOrderDetails()) {
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
	public APIPageableResponseDTO<OrderDTO> getOrderDTOList(Integer pageNo, Integer pageSize, String email,
			String status) {
		Page<Orders> page = null;

		if (status == null) {
			page = orderRepository.findAllByEmail(email, PageRequest.of(pageNo, pageSize));
		} else {
			List<String> statuses = new ArrayList<>();
			if (status.toLowerCase().equals("others")) {
				statuses.add("CANCELLED");
				statuses.add("REFUSED");
			} else {
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
			for (OrderDetail orderDetail : order.getOrderDetails()) {
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
		// return time.getLong(null);
		return time.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
	}

	public Orders updateStatus(Orders order) {
		if (order.getStatus().toUpperCase().equals("PENDING"))
			return order;
		if (order.getStatus().toUpperCase().equals("REFUSED"))
			return order;
		if (order.getStatus().toUpperCase().equals("CANCELLED"))
			return order;
		if (order.getStatus().toUpperCase().equals("SUCCESSFUL"))
			return order;
		if (order.getStatus().toUpperCase().equals("FAIL"))
			return order;

		long exp = getTimeMillis(order.getExpectedDeliveryTime());
		long cur = System.currentTimeMillis();
		long ort = getTimeMillis(order.getOrderTime());

		long part = (exp - ort) / 10;
		long currentPart = (cur - ort) / part;

		if (order.getStatus().equals("DELIVERYING") == false && currentPart >= 1) {
			order.setStatus("DELIVERYING");
			order.setLastUpdatedTime(LocalDateTime.now());
		}

		if (order.getStatus().equals("DELIVERYING") && currentPart >= 5)
			if (Math.random() % 5 == 2) // 1:5 FOR DELIVERYING EARLY
			{
				order.setStatus(Math.random() % 10 == 1 ? "FAIL" : "SUCCESSFUL"); // 1:10 => FAIL
				order.setLastUpdatedTime(LocalDateTime.now());
			}
		if (order.getStatus().equals("DELIVERYING") && currentPart >= 7) {
			order.setStatus(Math.random() % 10 == 1 ? "FAIL" : "SUCCESSFUL"); // 1:10 => FAIL
			order.setLastUpdatedTime(LocalDateTime.now());
		}

//		System.out.println("Update the order: " + order.getStatus());
		return save(order);
	}
	
	private LocalDateTime convertStringToLocalDateTime(String date) {
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	    LocalDateTime localDateTime = LocalDateTime.parse(date, formatter);
	    
	    return localDateTime;
	}

	@Override
	public void getOrderStatisticsByDay(String date,OrderStatisticsDTO orderStatisticsDTO) {
		LocalDateTime startDate = convertStringToLocalDateTime(date);
        LocalDateTime endDate = startDate.plusDays(1);
        List<Orders> orderList = orderRepository.findOrderByDay(startDate, endDate);
        
        //set up 
        double revenue = 0;
    	int PENDING = 0;
    	int CANCELLED = 0;
    	int REFUSED = 0;
    	int CONFIRMED = 0;
    	int DELIVERING = 0;
    	int FAIL = 0;
    	int SUCCESSFUL = 0;
        
        if (orderList!=null) {
			for (Orders orders : orderList) {
				//iteration each order detail
				for (OrderDetail tmp : orders.getOrderDetails()) {
					if(orders.getStatus().equals("SUCCESSFUL")) {
						revenue+=(tmp.getPrice()*tmp.getQuantity());
					}
				}
				if(orders.getStatus().equals("SUCCESSFUL")) SUCCESSFUL+=1;
				if(orders.getStatus().equals("PENDING")) PENDING+=1;
				if(orders.getStatus().equals("CANCELLED")) CANCELLED+=1;
				if(orders.getStatus().equals("REFUSED")) REFUSED+=1;
				if(orders.getStatus().equals("CONFIRMED")) CONFIRMED+=1;
				if(orders.getStatus().equals("DELIVERING")) DELIVERING+=1;
				if(orders.getStatus().equals("FAIL")) FAIL+=1;
			}
		}
        
        //set data
		orderStatisticsDTO.getDay().setTotal(orderList.size());
        orderStatisticsDTO.getDay().setRevenue(revenue);
        orderStatisticsDTO.getDay().setPENDING(PENDING);
        orderStatisticsDTO.getDay().setCANCELLED(CANCELLED);
        orderStatisticsDTO.getDay().setREFUSED(REFUSED);
        orderStatisticsDTO.getDay().setCONFIRMED(CONFIRMED);
        orderStatisticsDTO.getDay().setDELIVERING(DELIVERING);
        orderStatisticsDTO.getDay().setFAIL(FAIL);
        orderStatisticsDTO.getDay().setSUCCESSFUL(SUCCESSFUL);
	}
	
	@Override
	public void getOrderStatisticByWeek(String date, OrderStatisticsDTO orderStatisticsDTO) {
		LocalDateTime dateTime = convertStringToLocalDateTime(date);
		//Minus , Plus day formatter
        LocalDateTime firstDayOfWeek = dateTime;
        while (firstDayOfWeek.getDayOfWeek() != DayOfWeek.MONDAY)
            firstDayOfWeek = firstDayOfWeek.minusDays(1);
        LocalDateTime lastDayOfWeek = dateTime;
        while (lastDayOfWeek.getDayOfWeek() != DayOfWeek.SUNDAY)
            lastDayOfWeek = lastDayOfWeek.plusDays(1);
		
        List<Orders> orderList = orderRepository.findOrderByDay(firstDayOfWeek, lastDayOfWeek);
        
        //set data for day[] of week
        while(lastDayOfWeek.compareTo(firstDayOfWeek)>=0) {
        	firstDayOfWeek = firstDayOfWeek.plusDays(1);
        	List<Orders> orderDayList = orderRepository.findOrderByDay(firstDayOfWeek, firstDayOfWeek.plusDays(1));
        	double dayrevenue = 0;
        	int dayPENDING = 0;
        	int dayCANCELLED = 0;
        	int dayREFUSED = 0;
        	int dayCONFIRMED = 0;
        	int dayDELIVERING = 0;
        	int dayFAIL = 0;
        	int daySUCCESSFUL = 0;
        	if (orderList!=null) {
    			for (Orders orders : orderDayList) {
    				//iteration each order detail
    				for (OrderDetail tmp : orders.getOrderDetails()) {
    					if(orders.getStatus().equals("SUCCESSFUL")) {
    						dayrevenue+=(tmp.getPrice()*tmp.getQuantity());
    					}
    				}
    				if(orders.getStatus().equals("SUCCESSFUL")) daySUCCESSFUL+=1;
    				if(orders.getStatus().equals("PENDING")) dayPENDING+=1;
    				if(orders.getStatus().equals("CANCELLED")) dayCANCELLED+=1;
    				if(orders.getStatus().equals("REFUSED")) dayREFUSED+=1;
    				if(orders.getStatus().equals("CONFIRMED")) dayCONFIRMED+=1;
    				if(orders.getStatus().equals("DELIVERING")) dayDELIVERING+=1;
    				if(orders.getStatus().equals("FAIL")) dayFAIL+=1;
    			}
    		}
        	orderStatisticsDTO.getWeek().getDay().add(new Day(orderDayList.size(), dayrevenue, dayPENDING, dayCANCELLED, dayREFUSED, dayCONFIRMED, dayDELIVERING, dayFAIL, daySUCCESSFUL));
        }
        //set up
        double revenue = 0;
    	int PENDING = 0;
    	int CANCELLED = 0;
    	int REFUSED = 0;
    	int CONFIRMED = 0;
    	int DELIVERING = 0;
    	int FAIL = 0;
    	int SUCCESSFUL = 0;
    	if (orderList!=null) {
			for (Orders orders : orderList) {
				//iteration each order detail
				for (OrderDetail tmp : orders.getOrderDetails()) {
					if(orders.getStatus().equals("SUCCESSFUL")) {
						revenue+=(tmp.getPrice()*tmp.getQuantity());
					}
				}
				if(orders.getStatus().equals("SUCCESSFUL")) SUCCESSFUL+=1;
				if(orders.getStatus().equals("PENDING")) PENDING+=1;
				if(orders.getStatus().equals("CANCELLED")) CANCELLED+=1;
				if(orders.getStatus().equals("REFUSED")) REFUSED+=1;
				if(orders.getStatus().equals("CONFIRMED")) CONFIRMED+=1;
				if(orders.getStatus().equals("DELIVERING")) DELIVERING+=1;
				if(orders.getStatus().equals("FAIL")) FAIL+=1;
			}
		}
        
        //set data
		orderStatisticsDTO.getWeek().setTotal(orderList.size());
        orderStatisticsDTO.getWeek().setRevenue(revenue);
        orderStatisticsDTO.getWeek().setPENDING(PENDING);
        orderStatisticsDTO.getWeek().setCANCELLED(CANCELLED);
        orderStatisticsDTO.getWeek().setREFUSED(REFUSED);
        orderStatisticsDTO.getWeek().setCONFIRMED(CONFIRMED);
        orderStatisticsDTO.getWeek().setDELIVERING(DELIVERING);
        orderStatisticsDTO.getWeek().setFAIL(FAIL);
        orderStatisticsDTO.getWeek().setSUCCESSFUL(SUCCESSFUL);
	}
	
	@Override
	public void getOrderStatisticByMonth(String date, OrderStatisticsDTO orderStatisticsDTO) {
		
		 LocalDateTime firstDateOfMonth = convertStringToLocalDateTime(date).withDayOfMonth(1);
	     LocalDate lastDayOfMonth = YearMonth.from(firstDateOfMonth).atEndOfMonth();
	     LocalDateTime lastDateTimeOfMonth = lastDayOfMonth.atTime(firstDateOfMonth.toLocalTime());
	     
	     List<Orders> orderList = orderRepository.findOrderByDay(firstDateOfMonth, lastDateTimeOfMonth);
	     System.out.println(firstDateOfMonth);
	     System.out.println(lastDayOfMonth);
	     //set up
	        double revenue = 0;
	    	int PENDING = 0;
	    	int CANCELLED = 0;
	    	int REFUSED = 0;
	    	int CONFIRMED = 0;
	    	int DELIVERING = 0;
	    	int FAIL = 0;
	    	int SUCCESSFUL = 0;
	    	if (orderList!=null) {
				for (Orders orders : orderList) {
					//iteration each order detail
					for (OrderDetail tmp : orders.getOrderDetails()) {
						if(orders.getStatus().equals("SUCCESSFUL")) {
							revenue+=(tmp.getPrice()*tmp.getQuantity());
						}
					}
					if(orders.getStatus().equals("SUCCESSFUL")) SUCCESSFUL+=1;
					if(orders.getStatus().equals("PENDING")) PENDING+=1;
					if(orders.getStatus().equals("CANCELLED")) CANCELLED+=1;
					if(orders.getStatus().equals("REFUSED")) REFUSED+=1;
					if(orders.getStatus().equals("CONFIRMED")) CONFIRMED+=1;
					if(orders.getStatus().equals("DELIVERING")) DELIVERING+=1;
					if(orders.getStatus().equals("FAIL")) FAIL+=1;
				}
			}
	        
	        //set data
			orderStatisticsDTO.getMonth().setTotal(orderList.size());
	        orderStatisticsDTO.getMonth().setRevenue(revenue);
	        orderStatisticsDTO.getMonth().setPENDING(PENDING);
	        orderStatisticsDTO.getMonth().setCANCELLED(CANCELLED);
	        orderStatisticsDTO.getMonth().setREFUSED(REFUSED);
	        orderStatisticsDTO.getMonth().setCONFIRMED(CONFIRMED);
	        orderStatisticsDTO.getMonth().setDELIVERING(DELIVERING);
	        orderStatisticsDTO.getMonth().setFAIL(FAIL);
	        orderStatisticsDTO.getMonth().setSUCCESSFUL(SUCCESSFUL);
	}
	
	@Override
	public OrderStatisticsDTO getOrderStatistic(String date) {
		OrderStatisticsDTO orderStatisticsDTO = new OrderStatisticsDTO();
		getOrderStatisticsByDay(date, orderStatisticsDTO);
		getOrderStatisticByWeek(date, orderStatisticsDTO);
		getOrderStatisticByMonth(date, orderStatisticsDTO);
		return orderStatisticsDTO;
	}




}
