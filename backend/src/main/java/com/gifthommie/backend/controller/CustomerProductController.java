package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.ProductService;

@RestController
@RequestMapping("/customer/product")
public class CustomerProductController {
	
	@Autowired
	ProductService productService;
	
	// Get all product and Pageable
	//http://localhost:8080/customer/product
	@GetMapping
	public APIPageableResponseDTO<Product> getProductList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize
			) {
		return productService.getPageableProducts(pageNo, pageSize);
	}
	
	
	//Search: Get Product By Name 
	// How to view product search by name
	// http://localhost:8080/customer/product/name?search=Đồng Hồ
	@GetMapping("/name")
	public APIPageableResponseDTO<Product> getProductByName(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			@RequestParam(defaultValue = "", name = "search") String search
			) {
		return productService.SearchProductsByName(pageNo, pageSize, search);
	}
	
	//View Product Detail: get product by id
	//http://localhost:8080/customer/product/7
	@GetMapping("/{productId}")
	public Product getProduct(@PathVariable int productId) {
		if(productService.checkExist(productId) == false) {
			throw new NotFoundException("Product not found!!!");
		}
		return productService.getProductById(productId);
	}
	
	
	
	
}
