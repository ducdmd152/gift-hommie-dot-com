package com.gifthommie.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CartRequestDTO;
import com.gifthommie.backend.dto.ProductRequestDTO;
import com.gifthommie.backend.entity.Category;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.entity.ProductImage;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.CategoryRepository;
import com.gifthommie.backend.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductRepository productRepository;
	@Autowired
	CategoryRepository categoryRepository;
	
	// getPageableProducts
	@Override
	public APIPageableResponseDTO<Product> getPageableProducts(int pageNo, int pageSize) {
		Page<Product> page = productRepository.findAllByStatus(
				true,
				PageRequest.of(pageNo, pageSize)
				);
		return new APIPageableResponseDTO<Product>(page);
	}

	
	// searchProductsByName
	@Override
	public APIPageableResponseDTO<Product> searchProductsByName(int pageNo, int pageSize, String search, String sortField) {
		Pageable pageable = null;
		
		String str = sortField; // name-des   name-asc   price-des  price-asc
		String[] splitSortFeild = str.split("-");
		
		if (splitSortFeild[1].equals("des")) {
			pageable = PageRequest.of(pageNo, pageSize, Sort.by(splitSortFeild[0]).descending());
		}
		if (splitSortFeild[1].equals("asc")) {
			pageable = PageRequest.of(pageNo, pageSize, Sort.by(splitSortFeild[0]).ascending());
		}
		
		Page<Product> page = productRepository.finfAllByName(true, search, pageable);		
		return new APIPageableResponseDTO<Product>(page);
	}
	
	
	// searchProductsByNameInCategory
	@Override
	public APIPageableResponseDTO<Product> searchProductsByNameInCategory(Integer pageNo, Integer pageSize,
			String search, Integer category, String sortField) {
		Pageable pageable = null;
		
		String str = sortField; // name-des   name-asc   price-des  price-asc
		String[] splitSortFeild = str.split("-");
		
		if (splitSortFeild[1].equals("des")) {
			pageable = PageRequest.of(pageNo, pageSize, Sort.by(splitSortFeild[0]).descending());
		}
		if (splitSortFeild[1].equals("asc")) {
			pageable = PageRequest.of(pageNo, pageSize, Sort.by(splitSortFeild[0]).ascending());
		}
		
		Page<Product> page = productRepository.findAllByStatusByNameByCategory(true, search, category, pageable);
		return new APIPageableResponseDTO<Product>(page);
	}

	// Get related product
	@Override
	public APIPageableResponseDTO<Product> getProductByRelated(Integer pageNo, Integer pageSize, Integer realated) {
		Page<Product> page = productRepository.finfAllByRealated(true, realated, PageRequest.of(pageNo, pageSize));
		return new APIPageableResponseDTO<Product>(page);
	}


	// save product
	@Override
	public Product save(Product product) {
		Product result = productRepository.save(product);
		return result;
	}

	
	// checkExist product by id
	@Override
	public boolean checkExist(int productId) {
		if(productRepository.existsById(productId))
			return true;
		return false;
	}

	
	// delete product by id
	@Override
	public boolean delete(int productId) {
		if(checkExist(productId) == false)
			return false;
		productRepository.deleteById(productId);
		return true;
	}

	
	// getProductById
	@Override
	public Product getProductById(int productId) {
		Optional<Product> result = productRepository.findById(productId);
		if(result.isPresent()) {
			return result.get();
		}
		
		return null;
	}

	
	// Update product by id
	@Override
	public Product update(int productId, ProductRequestDTO productRequestDTO) {
		if(productRepository.existsById(productId) == false) {
			throw new RuntimeException("Product Not Exist!!!");
		}
		
		Product product = productRepository.findById(productId).get();
		product.setName(productRequestDTO.getName());
		product.setDescription(productRequestDTO.getDescription());
		product.setPrice(productRequestDTO.getPrice());
		product.setQuantity(productRequestDTO.getQuantity());
		product.setAvatar(productRequestDTO.getAvatar());
		Category category = categoryRepository.findById(productRequestDTO.getCategoryId()).get();
		product.setCategory(category);
		
		productRepository.save(product);
		return product;
	}

	
	// remove product by id (disable status)
	@Override
	public boolean remove(int productId) {
		if(checkExist(productId) == false)
			return false;
		Product product = productRepository.findById(productId).get();
		product.setStatus(false);
		productRepository.save(product);
		return true;
	}

	// createNewProduct
	@Override
	public Product createNewProductFrom(ProductRequestDTO productRequestDTO) {
		Product product = new Product();
		product.setId(0);
		product.setName(productRequestDTO.getName());
		product.setDescription(productRequestDTO.getDescription());
		product.setPrice(productRequestDTO.getPrice());
		product.setQuantity(productRequestDTO.getQuantity());
		product.setAvatar(productRequestDTO.getAvatar());
		Category category = categoryRepository.findById(productRequestDTO.getCategoryId()).get();
		product.setCategory(category);
		
		product = productRepository.save(product);
		
		return product;
	}


	@Override
	public float totalPrice(List<CartRequestDTO> cartList) {
		float tmpPrice = 0;
		for (CartRequestDTO cartRequestDTO : cartList) {
			Product product = productRepository.findById(cartRequestDTO.getProductId()).get();
			tmpPrice = tmpPrice + product.getPrice();
		}
		return tmpPrice;
	}





	

	
	
	


}
