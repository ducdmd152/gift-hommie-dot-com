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

import com.gifthommie.backend.dto.APIPageableResponse;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.service.ProductService;

@RestController
@RequestMapping("/staff")
public class StaffController {
	@Autowired
	ProductService productService;
	
	@GetMapping("/product")
	public APIPageableResponse<Product> getProductList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize
			) {
		return productService.getPageableProducts(pageNo, pageSize);
	}
	
	@PostMapping("/product")
	public Product addProduct(@RequestBody Product product) {
		Product result = productService.save(product);
		return result;
	}
	
	@PutMapping("/product")
	public Product updateProduct(@RequestBody Product product) {
		Product result = productService.save(product);
		return result;
	}
	
	@DeleteMapping("/product/{productId}")
	public void deleteCustomerById(@PathVariable int productId) {
		if (productService.checkExist(productId) == false) {
			throw new RuntimeException("Customer is not found: " + productId);
		}
		
		productService.delete(productId);
	}
}
