package com.gifthommie.backend.dto;

import java.util.ArrayList;
import java.util.List;

import com.gifthommie.backend.entity.Product;

public class ProductStatisticDTO {
	private Day day;
	private Week week;
	private Month month;
	private Quarter quarter;
	
	public ProductStatisticDTO() {
		
	}
	
	public ProductStatisticDTO(Day day, Week week, Month month, Quarter quarter) {
		super();
		this.day = day;
		this.week = week;
		this.month = month;
		this.quarter = quarter;
	}
	
	public Day getDay() {
		return day;
	}

	public void setDay(Day day) {
		this.day = day;
	}

	public Week getWeek() {
		return week;
	}

	public void setWeek(Week week) {
		this.week = week;
	}

	public Month getMonth() {
		return month;
	}

	public void setMonth(Month month) {
		this.month = month;
	}

	public Quarter getQuarter() {
		return quarter;
	}

	public void setQuarter(Quarter quarter) {
		this.quarter = quarter;
	}

	//============OBJECT=====================
	public static class Day {
		private ProductStatisticValue value;

		public Day() {

		}

		public Day(ProductStatisticValue value) {
			super();
			this.value = value;
		}

		public ProductStatisticValue getValue() {
			return value;
		}

		public void setValue(ProductStatisticValue value) {
			this.value = value;
		}

	}

	public static class Week {
		List<Day> days = new ArrayList<>();
		private ProductStatisticValue value;

		public Week() {
			super();
			// TODO Auto-generated constructor stub
		}
		public Week(List<Day> days, ProductStatisticValue value) {
			super();
			this.days = days;
			this.value = value;
		}
		public List<Day> getDays() {
			return days;
		}
		public void setDays(List<Day> days) {
			this.days = days;
		}
		public ProductStatisticValue getValue() {
			return value;
		}
		public void setValue(ProductStatisticValue value) {
			this.value = value;
		}

	}

	public static class Month {
		private ProductStatisticValue value;
		List<Week> weeks = new ArrayList<>();
		public Month(ProductStatisticValue value, List<Week> weeks) {
			super();
			this.value = value;
			this.weeks = weeks;
		}
		public Month() {
			super();
			// TODO Auto-generated constructor stub
		}
		public ProductStatisticValue getValue() {
			return value;
		}
		public void setValue(ProductStatisticValue value) {
			this.value = value;
		}
		public List<Week> getWeeks() {
			return weeks;
		}
		public void setWeeks(List<Week> weeks) {
			this.weeks = weeks;
		}

	}

	public static class Quarter {
		private ProductStatisticDTO value;

		List<Month> list = new ArrayList<>();

		public Quarter() {
			super();
			// TODO Auto-generated constructor stub
		}

		public Quarter(ProductStatisticDTO value, List<Month> list) {
			super();
			this.value = value;
			this.list = list;
		}

		public ProductStatisticDTO getValue() {
			return value;
		}

		public void setValue(ProductStatisticDTO value) {
			this.value = value;
		}

		public List<Month> getList() {
			return list;
		}

		public void setList(List<Month> list) {
			this.list = list;
		}
	}

	public static class ProductStatisticValue {
		Integer sold = 0;
		List<Product> topSale = new ArrayList<>();
		List<Product> topRating = new ArrayList<>();
		
		public ProductStatisticValue() {
			super();
			// TODO Auto-generated constructor stub
		}
		public ProductStatisticValue(Integer sold, List<Product> topSale, List<Product> topRating) {
			super();
			this.sold = sold;
			this.topSale = topSale;
			this.topRating = topRating;
		}
		public Integer getSold() {
			return sold;
		}
		public void setSold(Integer sold) {
			this.sold = sold;
		}
		public List<Product> getTopSale() {
			return topSale;
		}
		public void setTopSale(List<Product> topSale) {
			this.topSale = topSale;
		}
		public List<Product> getTopRating() {
			return topRating;
		}
		public void setTopRating(List<Product> topRating) {
			this.topRating = topRating;
		}
	}

}
