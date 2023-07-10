package com.gifthommie.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.aspectj.weaver.ast.Or;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.dto.OrderStatisticsDTO;
import com.gifthommie.backend.dto.RevenueDTO;
import com.gifthommie.backend.entity.Orders;

import net.bytebuddy.asm.Advice.Local;

public interface OrderService {
	
	public Orders getOrderByOrderId(Integer orderId);
	
	public List<Orders> getOrderListWithoutStatus(String[] tmp);
	
	public Orders save(CheckOutDTO checkOutDTO, String email);
	
	public APIPageableResponseDTO<Orders> getOrderList(Integer pageNo, Integer pageSize, String email);

	public void setStatusOfOrderById(int orderId, String status);
	
	APIPageableResponseDTO<Orders> getPageableOrder(Integer pageNo, Integer pageSize, String status);
	APIPageableResponseDTO<OrderDTO> getOrderDTOList(Integer pageNo, Integer pageSize, String email, String status);
	public APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail(Integer pageNo, Integer pageSize) ;
	
	public Orders save(Orders order);
	
//	public Double getRevenueOfWeek(String date);
	
	public OrderDTO getOrderDTOByOrderId(int orderId);

	public APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail(Integer pageNo, Integer pageSize, String status);
	
	public void getOrderStatisticByWeek(String date,OrderStatisticsDTO orderStatisticsDTO);
	
	public OrderStatisticsDTO getOrderStatistic(String date);
	
	public void getOrderStatisticsByDay(String date,OrderStatisticsDTO orderStatisticsDTO);
	
	public void getOrderStatisticByMonth(String date, OrderStatisticsDTO orderStatisticsDTO);
	
	public void getOrderStatisticByQuarter(String date, OrderStatisticsDTO orderStatisticsDTO);

	APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail_withSearch(Integer pageNo, Integer pageSize,
			String search);

	APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail_withSearch(Integer pageNo, Integer pageSize, String status,
			String search);
}
