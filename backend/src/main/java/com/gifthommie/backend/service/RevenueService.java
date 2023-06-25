package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.RevenueDTO;

public interface RevenueService {
	
	public RevenueDTO getRevenue(String date);
	
//	public Double getRevenueOfQuarter(String date);
}
