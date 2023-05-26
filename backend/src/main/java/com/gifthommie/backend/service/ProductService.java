package com.gifthommie.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.ProductRequestDTO;
import com.gifthommie.backend.entity.Product;

public interface ProductService {

	APIPageableResponseDTO<Product> getPageableProducts(int pageNo, int pageSize);
//	APIPageableResponse<Product> getPageableProducts(int page, int size, Sort sort);

	// cái method này nên theo camelConvention nhé, tại mình đang dùng Java (Q chơi ngay C# convention) ^^
	// APIPageableResponseDTO<Product> SearchProductsByName(int pageNo, int pageSize, String Search);
	APIPageableResponseDTO<Product> searchProductsByName(int pageNo, int pageSize, String Search);
	
	
	Product save(Product product);

	boolean checkExist(int productId);

	boolean delete(int productId);

	Product getProductById(int productId);

	Product update(int productId, ProductRequestDTO productRequestDTO);

	boolean remove(int productId);

	APIPageableResponseDTO<Product> searchProductsByNameInCategory(Integer pageNo, Integer pageSize, String search,
			Integer category);
}
