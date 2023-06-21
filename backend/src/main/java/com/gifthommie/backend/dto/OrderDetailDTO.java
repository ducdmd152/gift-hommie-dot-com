package com.gifthommie.backend.dto;

import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Product;

public class OrderDetailDTO extends OrderDetail {
	
//	private int id;
//	private int orderID;
//	private int productID;
//	private float price;
//	private int quantity;
	private Product product;
//	
//	private Float rating;
//	private String feedback;
//	
//	public Float getRating() {
//		return rating;
//	}
//
//	public void setRating(float rating) {
//		this.rating = rating;
//	}
//
//	public String getFeedback() {
//		return feedback;
//	}
//
//	public void setFeedback(String feedback) {
//		this.feedback = feedback;
//	}
//
	public OrderDetailDTO() {
		
	}
	
	public OrderDetailDTO(OrderDetail orderDetail) {
		this.setId(orderDetail.getId());
		this.setOrderId(orderDetail.getOrderId());		
		this.setPrice(orderDetail.getPrice());
		this.setQuantity(orderDetail.getQuantity());
		// added by Duy Duc
		this.setRating( orderDetail.getRating());
		this.setFeedback( orderDetail.getFeedback());
	}
	
	public OrderDetailDTO(OrderDetail orderDetail,Product tmpProduct) {
		this.setId(orderDetail.getId());
		this.setOrderId(orderDetail.getOrderId());		
		this.setPrice(orderDetail.getPrice());
		this.setQuantity(orderDetail.getQuantity());
		this.setProductId(tmpProduct.getId());
		this.setProduct(tmpProduct);
		// added by Duy Duc
		this.setRating( orderDetail.getRating());
		this.setFeedback( orderDetail.getFeedback());
	}
	
	
	
//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//
//	public int getOrderID() {
//		return orderID;
//	}
//
//	public void setOrderID(int orderID) {
//		this.orderID = orderID;
//	}
//
//	public int getProductID() {
//		return productID;
//	}
//
//	public void setProductID(int productID) {
//		this.productID = productID;
//	}
//
//	public float getPrice() {
//		return price;
//	}
//
//	public void setPrice(float price) {
//		this.price = price;
//	}
//
//	public int getQuantity() {
//		return quantity;
//	}
//
//	public void setQuantity(int quantity) {
//		this.quantity = quantity;
//	}
//
	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public float getTotal() {
		return this.getQuantity()*this.getPrice();
	}
}
