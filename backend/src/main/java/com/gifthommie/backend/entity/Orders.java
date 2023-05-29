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

@Entity
@Table(name = "orders")
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "payment_id")
	private Integer paymentId;
	
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", referencedColumnName = "id")
	@JsonIgnore
	private List<OrderDetail> orderDetails;
	
	@Column(name = "order_time")
	private LocalDateTime orderTime;
	
	@Column(name = "shipped_time")
	private LocalDateTime shippedTime;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "ward_id")
	private Integer wardId;
	
	@Column(name = "message")
	private String message;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "status_comment")
	private String statusComment;
	
	@Column(name = "last_updated_time")
	private LocalDateTime lastUpdatedTime;

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

	public List<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
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

	public LocalDateTime getShippedTime() {
		return shippedTime;
	}

	public void setShippedTime(LocalDateTime shippedTime) {
		this.shippedTime = shippedTime;
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

	public Integer getWardId() {
		return wardId;
	}

	public void setWardId(Integer wardId) {
		this.wardId = wardId;
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

	public String getStatusComment() {
		return statusComment;
	}

	public void setStatusComment(String statusComment) {
		this.statusComment = statusComment;
	}

	public LocalDateTime getLastUpdatedTime() {
		return lastUpdatedTime;
	}

	public void setLastUpdatedTime(LocalDateTime lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}
	
	@Override
	public String toString() {
		return "Orders [id=" + id + ", email=" + email + ", paymentId=" + paymentId + ", orderDetails=" + orderDetails
				+ ", orderTime=" + orderTime + ", shippedTime=" + shippedTime + ", name=" + name + ", phone=" + phone
				+ ", address=" + address + ", wardId=" + wardId + ", message=" + message + ", status=" + status
				+ ", statusComment=" + statusComment + ", lastUpdatedTime=" + lastUpdatedTime + "]";
	}
}
