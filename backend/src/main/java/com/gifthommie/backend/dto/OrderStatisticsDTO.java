package com.gifthommie.backend.dto;

import java.util.List;

public class OrderStatisticsDTO {
    private Day day;
    private Week week;
    private Month month;
    private Quarter quarter;
    private Year year;

    public OrderStatisticsDTO() {
        day = new Day();
        week = new Week();
        month = new Month();
        quarter = new Quarter();
        year = new Year();
    }

    public Day getDay() {
        return day;
    }

    public Week getWeek() {
        return week;
    }

    public Month getMonth() {
        return month;
    }

    public Quarter getQuarter() {
        return quarter;
    }

    public Year getYear() {
        return year;
    }

    public static class Day {
        private int total;
        private float revenue;
        private int successful;
        private int fail;
        private int pending;

        public int getTotal() {
            return total;
        }

        public void setTotal(int total) {
            this.total = total;
        }

        public float getRevenue() {
            return revenue;
        }

        public void setRevenue(float revenue) {
            this.revenue = revenue;
        }

        public int getSuccessful() {
            return successful;
        }

        public void setSuccessful(int successful) {
            this.successful = successful;
        }

        public int getFail() {
            return fail;
        }

        public void setFail(int fail) {
            this.fail = fail;
        }

        public int getPending() {
            return pending;
        }

        public void setPending(int pending) {
            this.pending = pending;
        }
    }

    public static class Week {
    	private List<Day> day;
        private int total;
		private float revenue;
        private int successful;
        private int fail;
        private int pending;

        public int getTotal() {
            return total;
        }

        public void setTotal(int total) {
            this.total = total;
        }

        public List<Day> getDay() {
			return day;
		}

		public void setDay(List<Day> day) {
			this.day = day;
		}
		
        public float getRevenue() {
            return revenue;
        }

        public void setRevenue(float revenue) {
            this.revenue = revenue;
        }

        public int getSuccessful() {
            return successful;
        }

        public void setSuccessful(int successful) {
            this.successful = successful;
        }

        public int getFail() {
            return fail;
        }

        public void setFail(int fail) {
            this.fail = fail;
        }

        public int getPending() {
            return pending;
        }

        public void setPending(int pending) {
            this.pending = pending;
        }
    }

    public static class Month {
        private int total;
        private List<Week> week;
        private float revenue;
        private int successful;
        private int fail;
        private int pending;

        public int getTotal() {
            return total;
        }

        public void setTotal(int total) {
            this.total = total;
        }
        
        public List<Week> getWeek() {
			return week;
		}

		public void setWeek(List<Week> week) {
			this.week = week;
		}

		public float getRevenue() {
            return revenue;
        }

        public void setRevenue(float revenue) {
            this.revenue = revenue;
        }

        public int getSuccessful() {
            return successful;
        }

        public void setSuccessful(int successful) {
            this.successful = successful;
        }

        public int getFail() {
            return fail;
        }

        public void setFail(int fail) {
            this.fail = fail;
        }

        public int getPending() {
            return pending;
        }

        public void setPending(int pending) {
            this.pending = pending;
        }
    }

    public static class Quarter {
        private int total;
        private float revenue;
        private int successful;
        private int fail;
        private int pending;

        public int getTotal() {
            return total;
        }

        public void setTotal(int total) {
            this.total = total;
        }

        public float getRevenue() {
            return revenue;
        }

        public void setRevenue(float revenue) {
            this.revenue = revenue;
        }

        public int getSuccessful() {
            return successful;
        }

        public void setSuccessful(int successful) {
            this.successful = successful;
        }

        public int getFail() {
            return fail;
        }

        public void setFail(int fail) {
            this.fail = fail;
        }

        public int getPending() {
            return pending;
        }

        public void setPending(int pending) {
            this.pending = pending;
        }
    }

    public static class Year {
        private int total;
        private float revenue;
        private int successful;
        private int fail;
        private int pending;

        public int getTotal() {
            return total;
        }

        public void setTotal(int total) {
            this.total = total;
        }

        public float getRevenue() {
            return revenue;
        }

        public void setRevenue(float revenue) {
            this.revenue = revenue;
        }

        public int getSuccessful() {
            return successful;
        }

        public void setSuccessful(int successful) {
            this.successful = successful;
        }

        public int getFail() {
            return fail;
        }

        public void setFail(int fail) {
            this.fail = fail;
        }

        public int getPending() {
            return pending;
        }

        public void setPending(int pending) {
            this.pending = pending;
        }
    }
}
