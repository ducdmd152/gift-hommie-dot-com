package com.gifthommie.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class RevenueObject {
	
	public static class Day {
		Double revenue = 0D;
		
		public Day() {
			
		}
		
		public Day(Double r) {
			revenue = r;
		}

		public Double getRevenue() {
			return revenue;
		}

		public void setRevenue(Double revenue) {
			this.revenue = revenue;
		}
	}
	
	public static class Week {
		Double revenue = 0D;
		
		List<Day> days = new ArrayList<>();
		
		public Week() {
			
		}

		public Week(Double revenue, List<Day> days) {
			super();
			this.revenue = revenue;
			this.days = days;
		}

		public Double getRevenue() {
			return revenue;
		}

		public void setRevenue(Double revenue) {
			this.revenue = revenue;
		}

		public List<Day> getDays() {
			return days;
		}

		public void setDays(List<Day> days) {
			this.days = days;
		}
	}
	
	public static class Month {
		Double revenue = 0D;
		
		List<Week> weeks = new ArrayList<>();
		
		public Month() {
			
		}

		public Month(Double revenue, List<Week> weeks) {
			super();
			this.revenue = revenue;
			this.weeks = weeks;
		}

		public Double getRevenue() {
			return revenue;
		}

		public void setRevenue(Double revenue) {
			this.revenue = revenue;
		}

		public List<Week> getWeeks() {
			return weeks;
		}

		public void setWeeks(List<Week> weeks) {
			this.weeks = weeks;
		}
	}
	
	public static class Quarter {
		Double revenue = 0D;
		
		List<Month> months = new ArrayList<>();
		
		public Quarter() {
		
		}

		public Quarter(Double revenue, List<Month> months) {
			super();
			this.revenue = revenue;
			this.months = months;
		}

		public Double getRevenue() {
			return revenue;
		}

		public void setRevenue(Double revenue) {
			this.revenue = revenue;
		}

		public List<Month> getMonths() {
			return months;
		}

		public void setMonths(List<Month> months) {
			this.months = months;
		}
	}
	
}
