package com.gifthommie.backend.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "email")
	private String email;
	
	@ManyToOne
	@JoinColumn(name = "product_id", referencedColumnName = "id")
//	@JsonIgnore
	private Product product;
	
	@Column(name = "quantity")
	private Integer quantity;
	
	@Column(name = "last_time_update")
	private LocalDateTime lastTimeUpdate;
	
	public Cart() {
		
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

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public LocalDateTime getLastTimeUpdate() {
		return lastTimeUpdate;
	}

	public void setLastTimeUpdate(LocalDateTime lastTimeUpdate) {
		this.lastTimeUpdate = lastTimeUpdate;
	}

	public float getTotal() {
		return quantity*product.getPrice();
	}
	@Override
	public String toString() {
		return "Cart [id=" + id + ", email=" + email + ", product=" + product + ", quantity=" + quantity
				+ ", lastTimeUpdate=" + lastTimeUpdate + "]";
	}

	
}
