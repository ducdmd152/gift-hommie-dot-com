package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.ProductStatisticDTO;

public interface ProductStatisticService {
//	public Day getRevenueOfDay(String date);
	public ProductStatisticDTO getProductStatistic(String date);
}
