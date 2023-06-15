package com.gifthommie.backend.dto;

import com.gifthommie.backend.entity.Cart;
import com.gifthommie.backend.entity.Product;

public class CartDTO {
	private int id;
	private int productId;
	private int quantity;
	private Product product;
	
	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	
	
	public CartDTO(int id, int productId, int quantity, Product product) {
		super();
		this.id = id;
		this.productId = productId;
		this.quantity = quantity;
		this.product = product;
	}

	public CartDTO(Cart cart) {
		id = cart.getId();
		productId = cart.getProduct().getId();
		quantity = cart.getQuantity();
		product = cart.getProduct();
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
