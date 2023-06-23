package com.gifthommie.backend.dto;

public class RevenueDTO {
	private Double day;
	private Double week;
	private Double month;
	private Double quarter;
	
	public RevenueDTO() {
		
	}

	public RevenueDTO(Double day, Double week, Double month, Double quarter) {
		super();
		this.day = day;
		this.week = week;
		this.month = month;
		this.quarter = quarter;
	}

	public Double getDay() {
		return day;
	}

	public void setDay(Double day) {
		this.day = day;
	}

	public Double getWeek() {
		return week;
	}

	public void setWeek(Double week) {
		this.week = week;
	}

	public Double getMonth() {
		return month;
	}

	public void setMonth(Double month) {
		this.month = month;
	}

	public Double getQuarter() {
		return quarter;
	}

	public void setQuarter(Double quarter) {
		this.quarter = quarter;
	}
	
	
	
}
