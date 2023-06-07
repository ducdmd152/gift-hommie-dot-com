package com.gifthommie.backend.dto;

import com.gifthommie.backend.entity.Cart;

public class CartResponseDTO {
	
	private int id;
	private int productId;
	private int quantity;
	
	public CartResponseDTO(int id, int productId, int quantity) {
		this.id = id;
		this.productId = productId;
		this.quantity = quantity;
	}
	
	public CartResponseDTO(Cart cart) {
		id = cart.getId();
		productId = cart.getProduct().getId();
		quantity = cart.getQuantity();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
}
