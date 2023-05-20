package com.gifthommie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponse;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.repository.ProductRepository;

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

	@Override
	public Product save(Product product) {
		Product result = productRepository.save(product);
		return result;
	}

	@Override
	public boolean checkExist(int productId) {
		if(productRepository.existsById(productId))
			return true;
		return false;
	}

	@Override
	public boolean delete(int productId) {
		if(checkExist(productId) == false)
			return false;
		productRepository.deleteById(productId);
		return true;
	}
	
	


}
