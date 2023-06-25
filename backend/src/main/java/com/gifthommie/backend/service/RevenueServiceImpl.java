package com.gifthommie.backend.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.RevenueDTO;
import com.gifthommie.backend.dto.RevenueObject.Day;
import com.gifthommie.backend.dto.RevenueObject.Month;
import com.gifthommie.backend.dto.RevenueObject.Quarter;
import com.gifthommie.backend.dto.RevenueObject.Week;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.repository.OrderRepository;

@Service
public class RevenueServiceImpl implements RevenueService{
	@Autowired 
	OrderRepository orderRepository;
	
	private final int DAYS_OF_WEEK = 7;
	private final int WEEKS_OF_MONTH = 4;
	private final int MONTHS_OF_QUARTER = 4;
	private final String DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";
	
	private LocalDateTime convertStringToLocalDateTime(String date) {
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);
	    LocalDateTime localDateTime = LocalDateTime.parse(date, formatter);
	    
	    return localDateTime;
	}
	
	private Double getRevenueFromTo(LocalDateTime startDate, LocalDateTime endDate) {
//	    List<Orders> list = orderRepository.findSuccessfulOrdersFromTo(startDate, endDate);
	    
//		Double revenue = 0D;

//		if (list != null)
//			for (Orders o : list)
//				for (OrderDetail od : o.getOrderDetails())
//					revenue += od.getPrice();
		
//		return revenue;
		
		Double revenue = orderRepository.getRevenueFromTo(startDate, endDate);
		
		return (revenue == null) ? 0D : revenue;
	}
	
	private Day getRevenueOfDay(String date) {
        LocalDateTime startDate = convertStringToLocalDateTime(date);
        LocalDateTime endDate = startDate.plusDays(1);
		
        return new Day(getRevenueFromTo(startDate, endDate));
	}
	
	private Week getRevenueOfWeek(String date) {
		LocalDateTime dateTime = convertStringToLocalDateTime(date);
		List<Day> days = new ArrayList<>();
        LocalDateTime firstDayOfWeek = dateTime;
        
        while (firstDayOfWeek.getDayOfWeek() != DayOfWeek.MONDAY)
            firstDayOfWeek = firstDayOfWeek.minusDays(1);

        LocalDateTime lastDayOfWeek = dateTime;
        while (lastDayOfWeek.getDayOfWeek() != DayOfWeek.SUNDAY)
            lastDayOfWeek = lastDayOfWeek.plusDays(1);
        
        dateTime = firstDayOfWeek;

        Double revenue = 0D;
        for (int i = 0; i < DAYS_OF_WEEK; ++i) {
        	Day day = getRevenueOfDay(DateTimeFormatter
        			.ofPattern(DATE_PATTERN)
        			.format(dateTime));
        	days.add(day);
        	
//        	System.out.println(dateTime.toString());
        	
        	//TOTAL OF REVENUE OF SEVEN DAYS
        	revenue += day.getRevenue();
        	
        	dateTime = dateTime.plusDays(1);
        }

        return new Week(revenue, days);
	}
	
	private Month getRevenueOfMonth(String date) {
        LocalDateTime firstDateOfMonth = convertStringToLocalDateTime(date).withDayOfMonth(1);
        LocalDate lastDayOfMonth = YearMonth.from(firstDateOfMonth).atEndOfMonth();
        LocalDateTime lastDateTimeOfMonth = lastDayOfMonth.atTime(firstDateOfMonth.toLocalTime());
        List<Week> weeks = new ArrayList<>();
        
        LocalDateTime dateTime = firstDateOfMonth;
        
        //TRAVESAL FROM 1ST TO END OF MONTH
        for (int i = 0; i < WEEKS_OF_MONTH; ++i) {
        	weeks.add(getRevenueOfWeek(DateTimeFormatter
        			.ofPattern(DATE_PATTERN)
        			.format(dateTime)));
        	
//        	System.out.println(dateTime.toString());
        	dateTime = dateTime.plusWeeks(1);
        }
        
        return new Month(getRevenueFromTo(firstDateOfMonth, lastDateTimeOfMonth.plusMonths(1)), weeks);
	}
	
	private Quarter getRevenueOfQuarter(String date) {
		LocalDateTime dateTime = convertStringToLocalDateTime(date);
		List<Month> months = new ArrayList<>();
        int currentQuarter = (dateTime.getMonthValue() - 1) / 3 + 1;

        LocalDateTime firstDayOfQuarter = dateTime.withMonth((currentQuarter - 1) * 3 + 1).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);

        dateTime = firstDayOfQuarter;
        Double revenue = 0D;
        
        for (int i = 0; i < MONTHS_OF_QUARTER; ++i) {
        	Month month = getRevenueOfMonth(DateTimeFormatter
        			.ofPattern(DATE_PATTERN)
        			.format(dateTime));
        	
        	months.add(month);
        	
//        	System.out.println(dateTime.toString());
        	revenue = month.getRevenue();
        	dateTime = dateTime.plusMonths(1);
        }
        
        return new Quarter(revenue, months);
	}

	
	@Override
	public RevenueDTO getRevenue(String date) {
		RevenueDTO revenueDTO = new RevenueDTO();
		
		revenueDTO.setDay(getRevenueOfDay(date));
		revenueDTO.setWeek(getRevenueOfWeek(date));
		revenueDTO.setMonth(getRevenueOfMonth(date));
		revenueDTO.setQuarter(getRevenueOfQuarter(date));
		
		return revenueDTO;
	}
	

}