package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.RatingRequestDTO;

public interface ReviewService {
	public void save(RatingRequestDTO ratingRequestDTO,String email);
}
