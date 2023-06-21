package com.gifthommie.backend.service;

import java.util.List;

import com.gifthommie.backend.dto.FeedbackDTO;

public interface FeedbackService {
	
	public List<FeedbackDTO> getFeedbackByProductId(int pageSize, 
									int pageNo, int productId);
	
}
