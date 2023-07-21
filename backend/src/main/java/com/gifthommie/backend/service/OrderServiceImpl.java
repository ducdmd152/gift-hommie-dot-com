package com.gifthommie.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
import com.gifthommie.backend.dto.OrderStatisticsDTO.Month;
import com.gifthommie.backend.dto.OrderStatisticsDTO.Week;
import com.gifthommie.backend.entity.Category;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.CategoryRepository;
import com.gifthommie.backend.repository.OrderDetailRepository;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	CategoryRepository categoryRepository;

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
		orderDTO.setComment(order.getComment());
		User tmpUser = userRepository.getUserByEmail(order.getEmail()); // GET USER

		List<OrderDetailDTO> orderDetailDTOs = new ArrayList(); // CONVERT DETAILS TO DETAIL-DTOs
		for (OrderDetail orderDetail : order.getOrderDetails()) {
			Product product = productService.getProductById(orderDetail.getProductId());
			Category cate = categoryRepository.getById(product.getCategoryId());
			if (cate.isStatus() == false) product.setStatus(false);
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
// <<<<<<< hoangthien0623
		List<OrderDTO> orderDTOList = new ArrayList<>();
		for (Orders order : page) {
			order = updateStatus(order);
			OrderDTO orderDTO = new OrderDTO(order);
// =======
//         List<OrderDTO> orderDTOList = new ArrayList<>();
//         for (Orders order : page) {
//         	order = updateStatus(order); // AUTO-UPDATE STATUS
        	
//             OrderDTO orderDTO = new OrderDTO(order);
// >>>>>>> main

			User tmpUser = userRepository.getUserByEmail(order.getEmail()); // GET USER

			List<OrderDetailDTO> orderDetailDTOs = new ArrayList<OrderDetailDTO>(); // CONVERT DETAILS TO DETAIL-DTOs
			;
			for (OrderDetail orderDetail : order.getOrderDetails()) {
				Product product = productService.getProductById(orderDetail.getProductId());
				Category cate = categoryRepository.getById(product.getCategoryId());
				if (cate.isStatus() == false) product.setStatus(false);
				orderDetailDTOs.add(new OrderDetailDTO(orderDetail, product));
			}

			// SET
			orderDTO.setUser(tmpUser);
			orderDTO.setOrderDetails(orderDetailDTOs);

			orderDTO.setComment(order.getComment()); orderDTOList.add(orderDTO);
		}

		APIPageableResponseDTO<OrderDTO> apiResponse = new APIPageableResponseDTO<>();
		apiResponse.setContent(orderDTOList);
		APIPageableDTO apiPageble = new APIPageableDTO(page);
		apiResponse.setPageable(apiPageble);
		return apiResponse;
	}
	
	@Override
	public APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail_withSearch(Integer pageNo, Integer pageSize, String search) {
		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("orderTime").descending()); // MODIFIED BY DUY DUC
		Page<Orders> page = orderRepository.findAllBySearch(pageable, search);
//        List<OrderDTO> orderList = page.getContent().stream().map(this::convertToDTO).collect(Collectors.toList());
// <<<<<<< hoangthien0623
		List<OrderDTO> orderDTOList = new ArrayList<>();
		for (Orders order : page) {
			order = updateStatus(order);
			OrderDTO orderDTO = new OrderDTO(order);
// =======
//         List<OrderDTO> orderDTOList = new ArrayList<>();
//         for (Orders order : page) {
//         	order = updateStatus(order); // AUTO-UPDATE STATUS
        	
//             OrderDTO orderDTO = new OrderDTO(order);
// >>>>>>> main

			User tmpUser = userRepository.getUserByEmail(order.getEmail()); // GET USER

			List<OrderDetailDTO> orderDetailDTOs = new ArrayList<OrderDetailDTO>(); // CONVERT DETAILS TO DETAIL-DTOs
			;
			for (OrderDetail orderDetail : order.getOrderDetails()) {
				Product product = productService.getProductById(orderDetail.getProductId());
				Category cate = categoryRepository.getById(product.getCategoryId());
				if (cate.isStatus() == false) product.setStatus(false);
				orderDetailDTOs.add(new OrderDetailDTO(orderDetail, product));
			}

			// SET
			orderDTO.setUser(tmpUser);
			orderDTO.setOrderDetails(orderDetailDTOs);

			orderDTO.setComment(order.getComment()); orderDTOList.add(orderDTO);
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
				Category cate = categoryRepository.getById(product.getCategoryId());
				if (cate.isStatus() == false) product.setStatus(false);
				orderDetailDTOs.add(new OrderDetailDTO(orderDetail, product));
			}

			// SET
			orderDTO.setUser(tmpUser);
			orderDTO.setOrderDetails(orderDetailDTOs);

			orderDTO.setComment(order.getComment()); orderDTOList.add(orderDTO);
		}

		APIPageableResponseDTO<OrderDTO> apiResponse = new APIPageableResponseDTO<>();
		apiResponse.setContent(orderDTOList);
		APIPageableDTO apiPageble = new APIPageableDTO(page);
		apiResponse.setPageable(apiPageble);
		return apiResponse;
	}

	@Override
	public APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail_withSearch(Integer pageNo, Integer pageSize, String status,  String search) {
		if (status == null)
			return getOrderDTOList_noEmail(pageNo, pageSize);

		List<String> statuses = new ArrayList<>();
		if (status.toLowerCase().equals("others")) {
			statuses.add("CANCELLED");
			statuses.add("REFUSED");
		} else {
			statuses.add(status);
		}

		Page<Orders> page = orderRepository.findAllWithStatusBySearch(statuses, search, PageRequest.of(pageNo, pageSize));

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
				Category cate = categoryRepository.getById(product.getCategoryId());
				if (cate.isStatus() == false) product.setStatus(false);
				orderDetailDTOs.add(new OrderDetailDTO(orderDetail, product));
			}

			// SET
			orderDTO.setUser(tmpUser);
			orderDTO.setOrderDetails(orderDetailDTOs);

			orderDTO.setComment(order.getComment()); orderDTOList.add(orderDTO);
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
			if (status.toLowerCase().equals("ordered")) {
//				System.out.println("ORDERED STATUS");
				statuses.add("PENDING");
				statuses.add("CONFIRMED");
			}
			else
			if (status.toLowerCase().equals("others")) {
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
			order = updateStatus(order); // AUTO-UPDATE STATUS
			OrderDTO orderDTO = new OrderDTO(order);

			User tmpUser = userRepository.getUserByEmail(email); // GET USER

			List<OrderDetailDTO> orderDetailDTOs = new ArrayList(); // CONVERT DETAILS TO DETAIL-DTOs
			;
			for (OrderDetail orderDetail : order.getOrderDetails()) {
				Product product = productService.getProductById(orderDetail.getProductId());
				Category cate = categoryRepository.getById(product.getCategoryId());
				if (cate.isStatus() == false) product.setStatus(false);
				orderDetailDTOs.add(new OrderDetailDTO(orderDetail, product));
			}

			// SET
			orderDTO.setUser(tmpUser);
			orderDTO.setOrderDetails(orderDetailDTOs);

			orderDTO.setComment(order.getComment()); orderDTOList.add(orderDTO);
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
		long ort = getTimeMillis(order.getLastUpdatedTime());
		if(cur >= exp && order.getStatus().equals("DELIVERYING") == false)  {
			order.setExpectedDeliveryTime(LocalDateTime.now().plusDays(1));
		}
		

		long part = (exp - ort) / 10;
		long currentPart = part == 0 ? 10 : ((cur - ort) / part);

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
				if(orders.getStatus().equals("DELIVERYING")) DELIVERING+=1;
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
//        LocalDateTime firstDayOfWeek = dateTime;
//        while (firstDayOfWeek.getDayOfWeek() != DayOfWeek.MONDAY)
//            firstDayOfWeek = firstDayOfWeek.minusDays(1);
//        LocalDateTime lastDayOfWeek = dateTime;
//        while (lastDayOfWeek.getDayOfWeek() != DayOfWeek.SUNDAY)
//            lastDayOfWeek = lastDayOfWeek.plusDays(1);
		
		LocalDateTime firstDayOfWeek = convertStringToLocalDateTime(date).minusDays(6);
		LocalDateTime lastDayOfWeek = convertStringToLocalDateTime(date);
//		System.out.println(firstDayOfWeek + " " + lastDayOfWeek);
        List<Orders> orderList = orderRepository.findOrderByDay(firstDayOfWeek, lastDayOfWeek);
        
        //set data for day[] of week
        while(lastDayOfWeek.compareTo(firstDayOfWeek)>=0) {
        	List<Orders> orderDayList = orderRepository.findOrderByDay(firstDayOfWeek, firstDayOfWeek.plusDays(1));
        	firstDayOfWeek = firstDayOfWeek.plusDays(1);
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
    				if(orders.getStatus().equals("DELIVERYING")) dayDELIVERING+=1;
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
				if(orders.getStatus().equals("DELIVERYING")) DELIVERING+=1;
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
	     
	     int count = 0;
	     while(lastDateTimeOfMonth.compareTo(firstDateOfMonth) >= 0 && count < 4) {
	        	List<Orders> orderWeekList = orderRepository.findOrderByDay(firstDateOfMonth, firstDateOfMonth.plusDays(7));
	        	count+=1;
	        	firstDateOfMonth = firstDateOfMonth.plusDays(7);
	        	double weekrevenue = 0;
	        	int weekPENDING = 0;
	        	int weekCANCELLED = 0;
	        	int weekREFUSED = 0;
	        	int weekCONFIRMED = 0;
	        	int weekDELIVERING = 0;
	        	int weekFAIL = 0;
	        	int weekSUCCESSFUL = 0;
	        	if (orderList!=null) {
	    			for (Orders orders : orderWeekList) {
	    				//iteration each order detail
	    				for (OrderDetail tmp : orders.getOrderDetails()) {
	    					if(orders.getStatus().equals("SUCCESSFUL")) {
	    						weekrevenue+=(tmp.getPrice()*tmp.getQuantity());
	    					}
	    				}
	    				if(orders.getStatus().equals("SUCCESSFUL")) weekSUCCESSFUL+=1;
	    				if(orders.getStatus().equals("PENDING")) weekPENDING+=1;
	    				if(orders.getStatus().equals("CANCELLED")) weekCANCELLED+=1;
	    				if(orders.getStatus().equals("REFUSED")) weekREFUSED+=1;
	    				if(orders.getStatus().equals("CONFIRMED")) weekCONFIRMED+=1;
	    				if(orders.getStatus().equals("DELIVERYING")) weekDELIVERING+=1;
	    				if(orders.getStatus().equals("FAIL")) weekFAIL+=1;
	    			}
	    		}
	        	orderStatisticsDTO.getMonth().getWeek().add(new Week(orderWeekList.size(), weekrevenue, weekPENDING, weekCANCELLED, weekREFUSED, weekCONFIRMED, weekDELIVERING, weekFAIL, weekSUCCESSFUL));
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
					if(orders.getStatus().equals("DELIVERYING")) DELIVERING+=1;
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
	public void getOrderStatisticByQuarter(String date, OrderStatisticsDTO orderStatisticsDTO) {
		LocalDateTime dateTime = convertStringToLocalDateTime(date);
        int currentQuarter = (dateTime.getMonthValue() - 1) / 3 + 1;
        LocalDateTime firstDayOfQuarter = dateTime.withMonth((currentQuarter - 1) * 3 + 1).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        dateTime = firstDayOfQuarter;
        List<Orders> orderList = orderRepository.findOrderByDay(firstDayOfQuarter, firstDayOfQuarter.plusMonths(3));
        
        int count = 1;
        while( count < 4) {
        	List<Orders> orderMonthList = orderRepository.findOrderByDay(firstDayOfQuarter, firstDayOfQuarter.plusMonths(1));
        	count+=1;
        	firstDayOfQuarter = firstDayOfQuarter.plusMonths(1);
        	double monthrevenue = 0;
        	int monthPENDING = 0;
        	int monthCANCELLED = 0;
        	int monthREFUSED = 0;
        	int monthCONFIRMED = 0;
        	int monthDELIVERING = 0;
        	int monthFAIL = 0;
        	int monthSUCCESSFUL = 0;
        	if (orderList!=null) {
    			for (Orders orders : orderMonthList) {
    				//iteration each order detail
    				for (OrderDetail tmp : orders.getOrderDetails()) {
    					if(orders.getStatus().equals("SUCCESSFUL")) {
    						monthrevenue+=(tmp.getPrice()*tmp.getQuantity());
    					}
    				}
    				if(orders.getStatus().equals("SUCCESSFUL"))	monthSUCCESSFUL+=1;
    				if(orders.getStatus().equals("PENDING")) monthPENDING+=1;
    				if(orders.getStatus().equals("CANCELLED")) monthCANCELLED+=1;
    				if(orders.getStatus().equals("REFUSED")) monthREFUSED+=1;
    				if(orders.getStatus().equals("CONFIRMED")) monthCONFIRMED+=1;
    				if(orders.getStatus().equals("DELIVERYING")) monthDELIVERING+=1;
    				if(orders.getStatus().equals("FAIL")) monthFAIL+=1;
    			}
    		}
        	orderStatisticsDTO.getQuarter().getMonth().add(new Month(orderMonthList.size(), monthrevenue, monthPENDING, monthCANCELLED, monthREFUSED, monthCONFIRMED, monthDELIVERING, monthFAIL, monthSUCCESSFUL));
     }
        
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
				if(orders.getStatus().equals("DELIVERYING")) DELIVERING+=1;
				if(orders.getStatus().equals("FAIL")) FAIL+=1;
			}
		}
        
        //set data
		orderStatisticsDTO.getQuarter().setTotal(orderList.size());
        orderStatisticsDTO.getQuarter().setRevenue(revenue);
        orderStatisticsDTO.getQuarter().setPENDING(PENDING);
        orderStatisticsDTO.getQuarter().setCANCELLED(CANCELLED);
        orderStatisticsDTO.getQuarter().setREFUSED(REFUSED);
        orderStatisticsDTO.getQuarter().setCONFIRMED(CONFIRMED);
        orderStatisticsDTO.getQuarter().setDELIVERING(DELIVERING);
        orderStatisticsDTO.getQuarter().setFAIL(FAIL);
        orderStatisticsDTO.getQuarter().setSUCCESSFUL(SUCCESSFUL);
	}
	
	@Override
	public OrderStatisticsDTO getOrderStatistic(String date) {
		OrderStatisticsDTO orderStatisticsDTO = new OrderStatisticsDTO();
		getOrderStatisticsByDay(date, orderStatisticsDTO);
		getOrderStatisticByWeek(date, orderStatisticsDTO);
		getOrderStatisticByMonth(date, orderStatisticsDTO);
		getOrderStatisticByQuarter(date, orderStatisticsDTO);
		return orderStatisticsDTO;
	}

}
