package com.gifthommie.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.User;

public class OrderDTO {
	
	private int id;
	
	private String name;
	private String phone;
	private String address;
	
	private int wardCode;
	private int districtID;
	private int provinceID;
	
	private String message;
	
	private List<OrderDetailDTO> orderDetails;
	private int paymentMethod;
	private float shippingFee;
	private int shippingMethod;
	
	private User user;
	
	private String status;
	private String comment;
	private LocalDateTime orderTime;
	private LocalDateTime lastUpdatedTime;
	
	
	
	public OrderDTO() {
		super();
	}
	
	public OrderDTO(Orders order,User userDTO,List<OrderDetailDTO> orderDetailDTOs) {
		this.id = order.getId();
		this.name=order.getName();
		this.phone=order.getPhone();
		this.address=order.getAddress();
		this.wardCode=order.getWardCode();
		this.districtID=order.getDistrictId();
		this.provinceID=order.getProviceId();
		this.message=order.getMessage();
		
		//Listorder
		this.orderDetails=orderDetailDTOs;
		this.paymentMethod=order.getPaymentId();
		this.shippingFee=order.getShippedFee();
		this.shippingMethod=order.getShippingMethod();
		this.user=userDTO;
		this.status=order.getStatus();
		this.orderTime=LocalDateTime.now();
		this.lastUpdatedTime=LocalDateTime.now();
	}
	public OrderDTO(List<OrderDetailDTO> orderDetailDTOs) {
		this.orderDetails=orderDetailDTOs;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getWardCode() {
		return wardCode;
	}
	public void setWardCode(int wardCode) {
		this.wardCode = wardCode;
	}
	public int getDistrictID() {
		return districtID;
	}
	public void setDistrictID(int districtID) {
		this.districtID = districtID;
	}
	public int getProvinceID() {
		return provinceID;
	}
	public void setProvinceID(int provinceID) {
		this.provinceID = provinceID;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<OrderDetailDTO> getOrderDetails() {
		return orderDetails;
	}
	public void setOrderDetails(List<OrderDetailDTO> orderDetails) {
		this.orderDetails = orderDetails;
	}
	public int getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(int paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public float getShippingFee() {
		return shippingFee;
	}
	public void setShippingFee(float shippingFee) {
		this.shippingFee = shippingFee;
	}
	public int getShippingMethod() {
		return shippingMethod;
	}
	public void setShippingMethod(int shippingMethod) {
		this.shippingMethod = shippingMethod;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public LocalDateTime getOrderTime() {
		return orderTime;
	}
	public void setOrderTime(LocalDateTime orderTime) {
		this.orderTime = orderTime;
	}
	public LocalDateTime getLastUpdatedTime() {
		return lastUpdatedTime;
	}
	public void setLastUpdatedTime(LocalDateTime lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}
	
	
}