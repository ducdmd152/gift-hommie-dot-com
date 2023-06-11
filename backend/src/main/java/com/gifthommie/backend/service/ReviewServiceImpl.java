package com.gifthommie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.RatingRequestDTO;
import com.gifthommie.backend.entity.Review;
import com.gifthommie.backend.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	ReviewRepository reviewRepository;
	
	@Override
	public void save(RatingRequestDTO ratingRequestDTO, String email) {
		// TODO Auto-generated method stub
		Review review = new Review(ratingRequestDTO, email);
		reviewRepository.save(review);
	}

}
