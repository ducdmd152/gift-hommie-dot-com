package com.gifthommie.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.ProductRequestDTO;
import com.gifthommie.backend.entity.Product;

public interface ProductService {

	APIPageableResponseDTO<Product> getPageableProducts(int pageNo, int pageSize);
//	APIPageableResponse<Product> getPageableProducts(int page, int size, Sort sort);

	Product save(Product product);

	boolean checkExist(int productId);

	boolean delete(int productId);

	Product getProductById(int productId);

	Product update(int productId, ProductRequestDTO productRequestDTO);

	boolean remove(int productId);
}
