package com.gifthomie.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.gifthomie.backend.dto.APIPageableResponse;
import com.gifthomie.backend.entity.Product;

public interface ProductService {

	APIPageableResponse<Product> getPageableProducts(int pageNo, int pageSize);
//	APIPageableResponse<Product> getPageableProducts(int page, int size, Sort sort);
}
