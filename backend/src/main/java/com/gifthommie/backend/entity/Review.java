package com.gifthommie.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gifthommie.backend.dto.RatingRequestDTO;

@Entity
@Table(name = "review")
public class Review {
	
	private static final Integer DEFAULT_ENABLE_VALUE = 1;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@Column(name = "email")
	private String email;
	
//	@Column(name = "order_detail_id")
//	private Integer orderDetailID;
	
	@ManyToOne
	@JoinColumn(name = "order_detail_id", referencedColumnName = "id")
	@JsonIgnore
	private OrderDetail orderDetail;
	
	@Column(name = "comment")
	private String comment;
	
	@Column(name = "rating")
	private Float rating;
	
	@Column(name = "enable")
	private Integer enable;
	
	public Review() {
		
	}
	
	public Review(RatingRequestDTO ratingRequestDTO, String email) {
		this.email = email;
//		this.orderDetail = orderDetailRepository.findOrderDetailById(ratingRequestDTO.getOrderDetailID());
		this.comment = ratingRequestDTO.getComment();
		this.rating = ratingRequestDTO.getRating();
		this.enable=DEFAULT_ENABLE_VALUE;
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

	
	
//	public Integer getOrderDetailID() {
//		return orderDetailID;
//	}
//
//	public void setOrderDetailID(Integer orderDetailID) {
//		this.orderDetailID = orderDetailID;
//	}

	public OrderDetail getOrderDetail() {
		return orderDetail;
	}

	public void setOrderDetail(OrderDetail orderDetail) {
		this.orderDetail = orderDetail;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Float getRating() {
		return rating;
	}

	public void setRating(Float rating) {
		this.rating = rating;
	}

	public Integer getEnable() {
		return enable;
	}

	public void setEnable(Integer enable) {
		this.enable = enable;
	}
	
	
}
