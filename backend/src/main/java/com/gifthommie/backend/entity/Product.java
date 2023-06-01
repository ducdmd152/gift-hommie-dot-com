package com.gifthommie.backend.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gifthommie.backend.service.ProductService;

@Entity
@Table(name = "product")
public class Product { 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "quantity")
	private Integer quantity;
	
	@Column(name = "price")
	private float price;
	
	@Column(name = "status")
	@JsonIgnore
	private boolean status = true;
	
	@ManyToOne
	@JoinColumn(name = "category_id", referencedColumnName = "id")
	@JsonIgnore
	private Category category;
	
	@OneToMany
	@JoinColumn(name = "product_id", referencedColumnName = "id")
	@JsonIgnore
	private List<ProductImage> productImages;
	
	@Column(name = "avatar")
	private String avatar;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	
	public Integer getCategoryId() {
		if(category == null) {
			return 0;
		}
		return category.getId();
	}
	
	public String getCategoryName() {
		if(category == null) {
			return "";
		}
		return category.getName();
	}

	public List<ProductImage> getProductImages() {
		return productImages;
	}

	public void setProductImages(List<ProductImage> productImages) {
		this.productImages = productImages;
	}
	
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getAvatar() {
		if(avatar != null) {
			return avatar;
		}
		
		if(productImages != null) {
			for(ProductImage productImage : productImages) {
				if(productImage.isMain()) {
					setAvatar(productImage.getUrl());
					return productImage.getUrl();
				}
			}
		}
		
		return "";
	}
}
