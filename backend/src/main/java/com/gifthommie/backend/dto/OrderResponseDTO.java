package com.gifthommie.backend.dto;

import java.time.LocalDateTime;


public class OrderResponseDTO {
	private int id;
	private int paymentId;
	private LocalDateTime orderTime;
	private LocalDateTime shippedTime;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}
	public LocalDateTime getOrderTime() {
		return orderTime;
	}
	public void setOrderTime(LocalDateTime orderTime) {
		this.orderTime = orderTime;
	}
	public LocalDateTime getShippedTime() {
		return shippedTime;
	}
	public void setShippedTime(LocalDateTime shippedTime) {
		this.shippedTime = shippedTime;
	}

	
}
