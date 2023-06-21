package com.gifthommie.backend.dto;

import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Product;

public class OrderDetailDTO {
	
	private int id;
	private int orderID;
	private int productID;
	private float price;
	private int quantity;
	private Product product;
	
	private float rating;
	private String feedback;
	
	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public OrderDetailDTO() {
		
	}
	
	public OrderDetailDTO(OrderDetail orderDetail) {
		this.id=orderDetail.getId();
		this.orderID=orderDetail.getOrderId();
		this.price=orderDetail.getPrice();
		this.quantity=orderDetail.getQuantity();
		
		// added by Duy Duc
		this.rating = orderDetail.getRating();
		this.feedback = orderDetail.getFeedback();
	}
	
	public OrderDetailDTO(OrderDetail orderDetail,Product tmpProduct) {
		this.id=orderDetail.getId();
		this.orderID=orderDetail.getOrderId();
		this.productID=tmpProduct.getId();
		this.price=orderDetail.getPrice();
		this.quantity=orderDetail.getQuantity();
		this.product=tmpProduct;
		// added by Duy Duc
		this.rating = orderDetail.getRating();
		this.feedback = orderDetail.getFeedback();
	}
	
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getOrderID() {
		return orderID;
	}

	public void setOrderID(int orderID) {
		this.orderID = orderID;
	}

	public int getProductID() {
		return productID;
	}

	public void setProductID(int productID) {
		this.productID = productID;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public float getTotal() {
		return (quantity*price);
	}
}
