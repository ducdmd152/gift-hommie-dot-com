package com.gifthommie.backend.dto;

import java.time.LocalDateTime;

import com.gifthommie.backend.entity.User;

public class FeedbackDTO {
	private User user;
	private Float rating;
	private String feedback;
	private LocalDateTime time;
	
	public FeedbackDTO() {
		
	}
	
	public FeedbackDTO(User user, Float rating, String feedback, LocalDateTime time) {
		this.user = user;
		this.rating = rating;
		this.feedback = feedback;
		this.time = time;
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
	
	public LocalDateTime getTime() {
		return time;
	}

	public void setTime(LocalDateTime time) {
		this.time = time;
	}

	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	
}
