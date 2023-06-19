package com.gifthommie.backend.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gifthommie.backend.entity.OrderDetail;
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
	@JsonIgnore
	private LocalDateTime orderTime;
	@JsonIgnore
	private LocalDateTime lastUpdatedTime;
	
	private LocalDateTime expectedDeliveryTime;
	
	public LocalDateTime getExpectedDeliveryTime() {
		return expectedDeliveryTime;
	}

	public void setExpectedDeliveryTime(LocalDateTime expectedDeliveryTime) {
		this.expectedDeliveryTime = expectedDeliveryTime;
	}

	public OrderDTO() {
		super();
	}
	
	public OrderDTO(Orders order) {
		this.id = order.getId();
		this.name=order.getName();
		this.phone=order.getPhone();
		this.address=order.getAddress();
		this.wardCode=order.getWardCode();
		this.districtID=order.getDistrictId();
		this.provinceID=order.getProviceId();
		this.message=order.getMessage();
		this.paymentMethod=order.getPaymentId();
		this.shippingFee=order.getShippedFee();
		this.shippingMethod=order.getShippingMethod();
		this.status=order.getStatus();
		this.orderTime=order.getOrderTime();
		this.lastUpdatedTime=order.getLastUpdatedTime();
		this.expectedDeliveryTime=order.getExpectedDeliveryTime();
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
		this.expectedDeliveryTime=order.getExpectedDeliveryTime();
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
	
	public void setOrderTime(LocalDateTime orderTime) {
		this.orderTime = orderTime;
	}
	// MODIFIED BY DUY DUC
//	public LocalDateTime getOrderTime() {
//		return orderTime;
//	}
//	public LocalDateTime getLastUpdatedTime() {
//		return lastUpdatedTime;
//	}
	
	public String getLastUpdatedTime() {
		return formatLocalDatime(lastUpdatedTime);
	}
	
	public String getOrderTime() {
		return formatLocalDatime(orderTime);
	}
	
	public LocalDateTime getOrderTimeBE() {
		return this.orderTime;
	}
	
	public String getCreateTime() {
		return formatLocalDatime(orderTime);
	}
	
	public String getUpdatedTime() {
		return formatLocalDatime(orderTime);
	}
	
	
	public void setLastUpdatedTime(LocalDateTime lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}
	
	private String formatLocalDatime(LocalDateTime time) {
		if(time == null) {
			return null;
		}
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
		return time.format(formatter);
	}
}
