package com.gifthommie.backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gifthommie.backend.dto.CheckOutDTO;

@Entity
@Table(name = "orders")
public class Orders {
	
	private static final String DEFAULT_STATUS = "PENDING";
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "shipping_order_code")
	private String shippingOrderCode;
	
	@Column(name = "shipping_method")
	private Integer shippingMethod;
	
	@Column(name = "payment_id")
	private Integer paymentId;
	
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", referencedColumnName = "id")
	@JsonIgnore
	private List<OrderDetail> orderDetails;
	
	@Column(name = "order_time")
	private LocalDateTime orderTime;
	
	@Column(name = "shipping_fee")
	private Float shippedFee;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "ward_code")
	private int wardCode;
	
	@Column(name = "district_id")
	private int districtId;
	
	@Column(name = "province_id")
	private int proviceId;
	
	@Column(name = "message")
	private String message;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "comment")
	private String comment;
	
	@Column(name = "last_updated_time")
	private LocalDateTime lastUpdatedTime;

	

	public List<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public Orders() {
		
	}

	public Orders(CheckOutDTO checkOutDTO,String email) {
		this.email = email;
		this.orderTime = LocalDateTime.now();
		this.shippedFee = checkOutDTO.getShippingFee();
		this.name = checkOutDTO.getName();
		this.phone = checkOutDTO.getPhone();
		this.address = checkOutDTO.getAddress();
		this.wardCode = checkOutDTO.getWardCode();
		this.districtId = checkOutDTO.getDistrictID();
		this.proviceId = checkOutDTO.getProvinceID();
		this.message = checkOutDTO.getMessage();
		this.paymentId=checkOutDTO.getPaymentMethod();
		this.shippedFee=checkOutDTO.getShippingFee();
		this.shippingMethod=checkOutDTO.getShippingMethod();
		this.status = DEFAULT_STATUS;
		this.lastUpdatedTime=LocalDateTime.now();
	}



	public String getShippingOrderCode() {
		return shippingOrderCode;
	}

	public void setShippingOrderCode(String shippingOrderCode) {
		this.shippingOrderCode = shippingOrderCode;
	}

	public Integer getShippingMethod() {
		return shippingMethod;
	}

	public void setShippingMethod(Integer shippingMethod) {
		this.shippingMethod = shippingMethod;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(Integer paymentId) {
		this.paymentId = paymentId;
	}

	public LocalDateTime getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(LocalDateTime orderTime) {
		this.orderTime = orderTime;
	}

	public Float getShippedFee() {
		return shippedFee;
	}

	public void setShippedFee(Float shippedFee) {
		this.shippedFee = shippedFee;
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

	public int getDistrictId() {
		return districtId;
	}

	public void setDistrictId(int districtId) {
		this.districtId = districtId;
	}

	public int getProviceId() {
		return proviceId;
	}

	public void setProviceId(int proviceId) {
		this.proviceId = proviceId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
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

	public LocalDateTime getLastUpdatedTime() {
		return lastUpdatedTime;
	}

	public void setLastUpdatedTime(LocalDateTime lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}

	public void setOrderDetails(List<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}

	@Override
	public String toString() {
		return "Orders [id=" + id + ", email=" + email + ", paymentId=" + paymentId + ", orderDetails=" + orderDetails
				+ ", orderTime=" + orderTime + ", shippedTime=" + shippedFee + ", name=" + name + ", phone=" + phone
				+ ", address=" + address + ", wardCode=" + wardCode + ", districtId=" + districtId + ", proviceId="
				+ proviceId + ", message=" + message + ", status=" + status + ", comment=" + comment
				+ ", lastUpdatedTime=" + lastUpdatedTime + "]";
	}



	

	
}
