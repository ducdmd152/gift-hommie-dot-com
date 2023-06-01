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
		
		return "data:image/jpeg;base64,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";
	}
}
