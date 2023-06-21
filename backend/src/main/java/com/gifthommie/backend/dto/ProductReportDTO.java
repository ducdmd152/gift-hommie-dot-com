package com.gifthommie.backend.dto;

public class ProductReportDTO {
	
	private Integer sold;
	private Float rating;
	
	public ProductReportDTO() {
		
	}
	
	public ProductReportDTO(Integer sold, Float rating) {
		this.sold = sold;
		this.rating = rating;
	}

	public int getSold() {
		return sold;
	}
	public void setSold(int sold) {
		this.sold = sold;
	}
	public Float getRating() {
		return rating;
	}
	public void setRating(Float rating) {
		this.rating = rating;
	}
	
}
