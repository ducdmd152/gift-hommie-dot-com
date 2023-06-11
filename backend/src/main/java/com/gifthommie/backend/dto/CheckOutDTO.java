package com.gifthommie.backend.dto;

import java.util.List;

import com.gifthommie.backend.entity.Cart;

public class CheckOutDTO {
		
	private String name;
	private String phone;
	private String address;
	private int wardCode;
	private String wardName;
	private int districtID;
	private String districtName;
	private int provinceID;
	private String provinceName;
	private String message;
	private List<CartRequestDTO> carts;
	private int paymentMethod;
	private Float shippingFee;
	
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
	public String getWardName() {
		return wardName;
	}
	public void setWardName(String wardName) {
		this.wardName = wardName;
	}
	public int getDistrictID() {
		return districtID;
	}
	public void setDistrictID(int districID) {
		this.districtID = districID;
	}
	public String getDistrictName() {
		return districtName;
	}
	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}
	public int getProvinceID() {
		return provinceID;
	}
	public void setProvinceID(int provinceID) {
		this.provinceID = provinceID;
	}
	public String getProvinceName() {
		return provinceName;
	}
	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<CartRequestDTO> getCarts() {
		return carts;
	}
	public void setCarts(List<CartRequestDTO> carts) {
		this.carts = carts;
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
	
	
}
