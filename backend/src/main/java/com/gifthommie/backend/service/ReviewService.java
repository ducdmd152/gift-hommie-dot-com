package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.RatingRequestDTO;
import com.gifthommie.backend.entity.Review;

public interface ReviewService {
	public void save(RatingRequestDTO ratingRequestDTO,String email);
	
	public APIPageableResponseDTO<Review> findReviewsByProductId(int pageNo, int pageSize, int productId, int enable);
}
