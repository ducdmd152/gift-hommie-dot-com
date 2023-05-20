package com.gifthomie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gifthomie.backend.dto.APIPageableResponse;
import com.gifthomie.backend.entity.Product;
import com.gifthomie.backend.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductRepository productRepository;
	
	@Override
	public APIPageableResponse<Product> getPageableProducts(int pageNo, int size) {
		Page<Product> page = productRepository.findAll(
				PageRequest.of(pageNo, size, Sort.by("id").descending())
				);
		return new APIPageableResponse<Product>(page);
	}


}
