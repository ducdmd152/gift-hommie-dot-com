package com.gifthommie.backend.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.RevenueDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.repository.OrderRepository;

@Service
public class RevenueServiceImpl implements RevenueService{
	@Autowired 
	OrderRepository orderRepository;
	
	private LocalDateTime convertStringToLocalDateTime(String date) {
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	    LocalDateTime localDateTime = LocalDateTime.parse(date, formatter);
	    
	    return localDateTime;
	}
	
	private Double getRevenueFromTo(LocalDateTime startDate, LocalDateTime endDate) {
	    List<Orders> list = orderRepository.findSuccessfulOrdersFromTo(startDate, endDate);
	    
		Double revenue = 0D;

		if (list != null)
			for (Orders o : list)
				for (OrderDetail od : o.getOrderDetails())
					revenue += od.getPrice();
		
		return revenue;
	}
	
	private Double getRevenueOfDay(String date) {
        LocalDateTime startDate = convertStringToLocalDateTime(date);
        LocalDateTime endDate = startDate.plusDays(1);
		
        return getRevenueFromTo(startDate, endDate);
	}
	
	private Double getRevenueOfWeek(String date) {
		LocalDateTime dateTime = convertStringToLocalDateTime(date);
		
        LocalDateTime firstDayOfWeek = dateTime;
        while (firstDayOfWeek.getDayOfWeek() != DayOfWeek.MONDAY)
            firstDayOfWeek = firstDayOfWeek.minusDays(1);

        LocalDateTime lastDayOfWeek = dateTime;
        while (lastDayOfWeek.getDayOfWeek() != DayOfWeek.SUNDAY)
            lastDayOfWeek = lastDayOfWeek.plusDays(1);
        
        return getRevenueFromTo(firstDayOfWeek, lastDayOfWeek);
	}
	
	private Double getRevenueOfMonth(String date) {
        LocalDateTime firstDateOfMonth = convertStringToLocalDateTime(date).withDayOfMonth(1);
        LocalDate lastDayOfMonth = YearMonth.from(firstDateOfMonth).atEndOfMonth();
        LocalDateTime lastDateTimeOfMonth = lastDayOfMonth.atTime(firstDateOfMonth.toLocalTime());
        
        return getRevenueFromTo(firstDateOfMonth, lastDateTimeOfMonth);
	}
	
	private Double getRevenueOfQuarter(String date) {
		LocalDateTime dateTime = convertStringToLocalDateTime(date);
		
        int currentQuarter = (dateTime.getMonthValue() - 1) / 3 + 1;

        LocalDateTime firstDayOfQuarter = dateTime.withMonth((currentQuarter - 1) * 3 + 1).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime lastDayOfQuarter = firstDayOfQuarter.withMonth(firstDayOfQuarter.getMonth().plus(2).getValue()).with(TemporalAdjusters.lastDayOfMonth()).withHour(23).withMinute(59).withSecond(59);
        
        return getRevenueFromTo(firstDayOfQuarter, lastDayOfQuarter);
	}

	
	@Override
	public RevenueDTO getRevenue(String date) {
		RevenueDTO r = new RevenueDTO();
		
		r.setDay(getRevenueOfDay(date));
		r.setWeek(getRevenueOfWeek(date));
		r.setMonth(getRevenueOfMonth(date));
		r.setQuarter(getRevenueOfQuarter(date));
		
		return r;
	}
	

}
