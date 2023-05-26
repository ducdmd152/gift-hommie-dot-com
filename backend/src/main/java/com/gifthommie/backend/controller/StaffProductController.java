package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.ProductRequestDTO;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.ProductService;

@RestController
@RequestMapping("/staff/product")
public class StaffProductController {
	@Autowired
	ProductService productService;
	
	@GetMapping
	public APIPageableResponseDTO<Product> getProductList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			@RequestParam(defaultValue = "", name = "search") String search,
			@RequestParam(name = "category", required = false) Integer category
			) {
		if(category == null || category==0) {
			return productService.searchProductsByName(pageNo, pageSize, search);
		}
		return productService.searchProductsByNameInCategory(pageNo, pageSize, search, category);
	}
	
	@GetMapping("/{productId}")
	public Product getProduct(@PathVariable int productId) {
		if(productService.checkExist(productId) == false) {
			throw new NotFoundException("Product not found!!!");
		}
		return productService.getProductById(productId);
	}
	
	@PostMapping
	public Product addProduct(@RequestBody Product product) {
		Product result = productService.save(product);
		return result;
	}
	
	@PutMapping("/{productId}")
	public Product updateProduct(@PathVariable int productId, @RequestBody ProductRequestDTO productRequestDTO) {
		Product result = productService.update(productId, productRequestDTO);
		return result;
	}
	
	@DeleteMapping("/{productId}")
	public void deleteCustomerById(@PathVariable int productId) {
		if (productService.remove(productId) == false) {
			throw new RuntimeException("Fail to remove the product: " + productId);
		}
	}
}
