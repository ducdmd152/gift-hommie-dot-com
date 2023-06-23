package com.gifthommie.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class OrderStatisticsDTO {
    private Day day;
    private Week week;
    
	public OrderStatisticsDTO() {
		super();
		this.day = new Day();
		this.week = new Week();
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


	public static class Day{
    	private int total;
    	private double revenue;
    	private int PENDING;
    	private int CANCELLED;
    	private int REFUSED;
    	private int CONFIRMED;
    	private int DELIVERING;
    	private int FAIL;
    	private int SUCCESSFUL;
    	
		public Day() {
			super();
		}
		

		public Day(int total, double revenue, int pENDING, int cANCELLED, int rEFUSED, int cONFIRMED, int dELIVERING,
				int fAIL, int sUCCESSFUL) {
			super();
			this.total = total;
			this.revenue = revenue;
			PENDING = pENDING;
			CANCELLED = cANCELLED;
			REFUSED = rEFUSED;
			CONFIRMED = cONFIRMED;
			DELIVERING = dELIVERING;
			FAIL = fAIL;
			SUCCESSFUL = sUCCESSFUL;
		}



		public int getTotal() {
			return total;
		}

		public void setTotal(int total) {
			this.total = total;
		}

		public double getRevenue() {
			return revenue;
		}

		public void setRevenue(double revenue) {
			this.revenue = revenue;
		}

		public int getPENDING() {
			return PENDING;
		}

		public void setPENDING(int pENDING) {
			PENDING = pENDING;
		}

		public int getCANCELLED() {
			return CANCELLED;
		}

		public void setCANCELLED(int cANCELLED) {
			CANCELLED = cANCELLED;
		}

		public int getREFUSED() {
			return REFUSED;
		}

		public void setREFUSED(int rEFUSED) {
			REFUSED = rEFUSED;
		}

		public int getCONFIRMED() {
			return CONFIRMED;
		}

		public void setCONFIRMED(int cONFIRMED) {
			CONFIRMED = cONFIRMED;
		}

		public int getDELIVERING() {
			return DELIVERING;
		}

		public void setDELIVERING(int dELIVERING) {
			DELIVERING = dELIVERING;
		}

		public int getFAIL() {
			return FAIL;
		}

		public void setFAIL(int fAIL) {
			FAIL = fAIL;
		}

		public int getSUCCESSFUL() {
			return SUCCESSFUL;
		}

		public void setSUCCESSFUL(int sUCCESSFUL) {
			SUCCESSFUL = sUCCESSFUL;
		}
    }
    
	public static class Week{
		private int total;
    	private double revenue;
    	private int PENDING;
    	private int CANCELLED;
    	private int REFUSED;
    	private int CONFIRMED;
    	private int DELIVERING;
    	private int FAIL;
    	private int SUCCESSFUL;
    	private List<Day> day;
    	
		public Week() {
			super();
			day = new ArrayList<>();
		}

		public int getTotal() {
			return total;
		}

		public void setTotal(int total) {
			this.total = total;
		}

		public double getRevenue() {
			return revenue;
		}

		public void setRevenue(double revenue) {
			this.revenue = revenue;
		}

		public int getPENDING() {
			return PENDING;
		}

		public void setPENDING(int pENDING) {
			PENDING = pENDING;
		}

		public int getCANCELLED() {
			return CANCELLED;
		}

		public void setCANCELLED(int cANCELLED) {
			CANCELLED = cANCELLED;
		}

		public int getREFUSED() {
			return REFUSED;
		}

		public void setREFUSED(int rEFUSED) {
			REFUSED = rEFUSED;
		}

		public int getCONFIRMED() {
			return CONFIRMED;
		}

		public void setCONFIRMED(int cONFIRMED) {
			CONFIRMED = cONFIRMED;
		}

		public int getDELIVERING() {
			return DELIVERING;
		}

		public void setDELIVERING(int dELIVERING) {
			DELIVERING = dELIVERING;
		}

		public int getFAIL() {
			return FAIL;
		}

		public void setFAIL(int fAIL) {
			FAIL = fAIL;
		}

		public int getSUCCESSFUL() {
			return SUCCESSFUL;
		}

		public void setSUCCESSFUL(int sUCCESSFUL) {
			SUCCESSFUL = sUCCESSFUL;
		}

		public List<Day> getDay() {
			return day;
		}

		public void setDay(List<Day> day) {
			this.day = day;
		}
    	
		
    	
	}
}
