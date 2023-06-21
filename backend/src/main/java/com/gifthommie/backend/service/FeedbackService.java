package com.gifthommie.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.gifthommie.backend.dto.FeedbackDTO;

public interface FeedbackService {
	
	public Page<FeedbackDTO> getFeedbackByProductId(int pageSize, 
									int pageNo, int productId);
	
}
