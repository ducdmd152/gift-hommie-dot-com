package com.gifthommie.backend.service;

import org.springframework.data.domain.Page;

import com.gifthommie.backend.dto.FeedbackDTO;
import com.gifthommie.backend.dto.ProductReportDTO;

public interface FeedbackService {
	
	public Page<FeedbackDTO> getFeedbackByProductId(int pageSize, 
									int pageNo, int productId);
	
	public ProductReportDTO getProductReportByProductId(int productId);
}
