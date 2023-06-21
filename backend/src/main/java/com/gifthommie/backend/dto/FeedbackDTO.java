package com.gifthommie.backend.dto;

import com.gifthommie.backend.entity.User;

public class FeedbackDTO {
	private User user;
	private Float rating;
	private String feedback;
	
	public FeedbackDTO() {
		
	}
	
	public FeedbackDTO(User user, Float rating, String feedback) {
		this.user = user;
		this.rating = rating;
		this.feedback = feedback;
	}

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Float getRating() {
		return rating;
	}
	public void setRating(Float rating) {
		this.rating = rating;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	
}
