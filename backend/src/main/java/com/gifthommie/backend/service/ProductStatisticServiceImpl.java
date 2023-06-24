package com.gifthommie.backend.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.RevenueDTO;
import com.gifthommie.backend.dto.ProductStatisticDTO;
import com.gifthommie.backend.dto.ProductStatisticDTO.Day;
import com.gifthommie.backend.dto.ProductStatisticDTO.Month;
import com.gifthommie.backend.dto.ProductStatisticDTO.ProductStatisticValue;
import com.gifthommie.backend.dto.ProductStatisticDTO.Quarter;
import com.gifthommie.backend.dto.ProductStatisticDTO.Week;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.repository.ProductRepository;

@Service
public class ProductStatisticServiceImpl implements ProductStatisticService {
	@Autowired
	OrderRepository orderRepository;
	@Autowired
	ProductRepository productRepository;

	private final boolean ENABLED = true;
	private final int DAYS_OF_WEEK = 7;
	private final int WEEKS_OF_MONTH = 4;
	private final int MONTHS_OF_QUARTER = 4;
	private final String DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";

	private LocalDateTime convertStringToLocalDateTime(String date) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);
		LocalDateTime localDateTime = LocalDateTime.parse(date, formatter);

		return localDateTime;
	}

	private ProductStatisticValue getProductStatisticFromTo(LocalDateTime startDate, LocalDateTime endDate) {
		List<Orders> list = orderRepository.findSuccessfulOrdersFromTo(startDate, endDate);
	    HashMap<Integer, Integer> sale = new HashMap<>();
	    HashMap<Integer, Float> rating = new HashMap<>();

		int sold = 0;

		List<Product> topSale = new ArrayList<>();
		List<Product> topRating = new ArrayList<>();

		if (list != null)
			for (Orders o : list)
				for (OrderDetail od : o.getOrderDetails()) {
					sold += od.getQuantity();
					int productId = od.getProductId();

					// SALE
					if (sale.get(productId) == null)
						sale.put(productId, 0);
					sale.put(productId, sale.get(productId) + 1);
					
					// RATING
					if (rating.get(productId) == null)
						rating.put(productId, 0F);
					
					rating.put(productId, rating.get(productId) + od.getRating());
				}
		
		for (int productId : rating.keySet())
			rating.put(productId, rating.get(productId) / sale.get(productId));
		
		for (int productId : rating.keySet()) {
			Product p = productRepository.findProductById(productId, ENABLED);
			
			p.setSold(sale.get(productId));
			p.setRating(rating.get(productId));
			
			topSale.add(p);
			topRating.add(p);
		}
		
		topSale.sort(new Comparator<Product>() {
			@Override
			public int compare(Product o1, Product o2) {
				return o2.getSold().compareTo(o1.getSold());
			}
		});
		
		topRating.sort(new Comparator<Product>() {
			public int compare(Product o1, Product o2) {
				return o2.getRating().compareTo(o1.getRating());
			};
		});
		
		return new ProductStatisticValue(sold, topSale, topRating);
	}

	public Day getProductStatisticOfDay(String date) {
		LocalDateTime startDate = convertStringToLocalDateTime(date);
		LocalDateTime endDate = startDate.plusDays(1);

        return new Day(getProductStatisticFromTo(startDate, endDate));
	}

	private Week getProductStatisticOfWeek(String date) {
		LocalDateTime dateTime = convertStringToLocalDateTime(date);
		List<Day> days = new ArrayList<>();
        LocalDateTime firstDayOfWeek = dateTime;
        
        while (firstDayOfWeek.getDayOfWeek() != DayOfWeek.MONDAY)
            firstDayOfWeek = firstDayOfWeek.minusDays(1);

        LocalDateTime lastDayOfWeek = dateTime;
        while (lastDayOfWeek.getDayOfWeek() != DayOfWeek.SUNDAY)
            lastDayOfWeek = lastDayOfWeek.plusDays(1);
        
        dateTime = firstDayOfWeek;

        int sold = 0;
        for (int i = 0; i < DAYS_OF_WEEK; ++i) {
        	Day day = getProductStatisticOfDay(DateTimeFormatter
        			.ofPattern(DATE_PATTERN)
        			.format(dateTime));
        	days.add(day);
        	
//        	System.out.println(dateTime.toString());
        	
        	//TOTAL OF SOLD PRODUCT OF SEVEN DAYS
        	sold += day.getValue().getSold();
        	
        	dateTime = dateTime.plusDays(1);
        }

        return new Week(days, getProductStatisticFromTo(firstDayOfWeek, lastDayOfWeek.plusDays(1)));
	}

	private Month getStatisticOfMonth(String date) {
        LocalDateTime firstDateOfMonth = convertStringToLocalDateTime(date).withDayOfMonth(1);
        LocalDate lastDayOfMonth = YearMonth.from(firstDateOfMonth).atEndOfMonth();
        LocalDateTime lastDateTimeOfMonth = lastDayOfMonth.atTime(firstDateOfMonth.toLocalTime());
        List<Week> weeks = new ArrayList<>();
        
        LocalDateTime dateTime = firstDateOfMonth;
        
        //TRAVESAL FROM 1ST TO END OF MONTH
        for (int i = 0; i < WEEKS_OF_MONTH; ++i) {
        	weeks.add(getProductStatisticOfWeek(DateTimeFormatter
        			.ofPattern(DATE_PATTERN)
        			.format(dateTime)));
        	
//        	System.out.println(dateTime.toString());
        	dateTime = dateTime.plusWeeks(1);
        }
        
        return new Month(weeks, getProductStatisticFromTo(firstDateOfMonth, lastDateTimeOfMonth.plusMonths(1)));
	}

	private Quarter getProductStatisticOfQuarter(String date) {
		LocalDateTime dateTime = convertStringToLocalDateTime(date);
		List<Month> months = new ArrayList<>();
        int currentQuarter = (dateTime.getMonthValue() - 1) / 3 + 1;

        LocalDateTime firstDayOfQuarter = dateTime.withMonth((currentQuarter - 1) * 3 + 1).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime lastDayOfQuarter = firstDayOfQuarter.plusMonths(4);
        dateTime = firstDayOfQuarter;
        Double revenue = 0D;
        
        for (int i = 0; i < MONTHS_OF_QUARTER; ++i) {
        	Month month = getStatisticOfMonth(DateTimeFormatter
        			.ofPattern(DATE_PATTERN)
        			.format(dateTime));
        	
        	months.add(month);
        	
//        	System.out.println(dateTime.toString());
//        	revenue = month.getRevenue();
        	dateTime = dateTime.plusMonths(1);
        }
        
        return new Quarter(months, getProductStatisticFromTo(firstDayOfQuarter, lastDayOfQuarter));
	}
	
	@Override
	public ProductStatisticDTO getProductStatistic(String date) {
		ProductStatisticDTO productStatisticDTO = new ProductStatisticDTO();
		
		productStatisticDTO.setDay(getProductStatisticOfDay(date));
		productStatisticDTO.setWeek(getProductStatisticOfWeek(date));
		productStatisticDTO.setMonth(getStatisticOfMonth(date));
		productStatisticDTO.setQuarter(getProductStatisticOfQuarter(date));
		
		return productStatisticDTO;
	}
}
