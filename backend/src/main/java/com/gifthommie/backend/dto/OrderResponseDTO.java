package com.gifthommie.backend.dto;

import java.time.LocalDateTime;


public class OrderResponseDTO {
	private int id;
	private int paymentId;
	private LocalDateTime orderTime;
	private LocalDateTime shippedTime;
	private float totalPrice;
	
	public OrderResponseDTO() {
		super();
	}

	
	
	
	public OrderResponseDTO(int id, int paymentId, LocalDateTime orderTime, LocalDateTime shippedTime,
			float totalPrice) {
		super();
		this.id = id;
		this.paymentId = paymentId;
		this.orderTime = orderTime;
		this.shippedTime = shippedTime;
		this.totalPrice = totalPrice;
	}



	public float getTotalPrice() {
		return totalPrice;
	}




	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}




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
