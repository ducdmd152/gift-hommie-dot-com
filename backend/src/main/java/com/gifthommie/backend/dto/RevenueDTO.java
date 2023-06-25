package com.gifthommie.backend.dto;

import com.gifthommie.backend.dto.RevenueObject.Day;
import com.gifthommie.backend.dto.RevenueObject.Month;
import com.gifthommie.backend.dto.RevenueObject.Quarter;
import com.gifthommie.backend.dto.RevenueObject.Week;

public class RevenueDTO {
	private Day day;
	private Week week;
	private Month month;
	private Quarter quarter;
	
	public RevenueDTO() {
		
	}
	
	public RevenueDTO(Day day, Week week, Month month, Quarter quarter) {
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
	
	
	
}