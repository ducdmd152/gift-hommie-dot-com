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
	
		//List Product 				            : http://localhost:8080/customer/product/
		//List Product By Category              : http://localhost:8080/customer/product?category=1
		//List Product Filter Sort By Name      : http://localhost:8080/customer/product?sort=name
		//List Product Filter Sort By Price     : http://localhost:8080/customer/product?sort=price
		
		//List Product By Category and Filter Sort By Price  : http://localhost:8080/customer/product?category=1&sort=price
		//List Product By Category and Filter Sort By Name   : http://localhost:8080/customer/product?category=1&sort=name
	
	@GetMapping
	public APIPageableResponseDTO<Product> getProductList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			@RequestParam(defaultValue = "", name = "search") String search,
			@RequestParam(name = "category", required = false) Integer category,
			@RequestParam(name = "sort", defaultValue = "id") String sortField,
			@RequestParam(name = "order", required = false) Boolean sortOrder
			) {
		
		if(category == null || category==0) {
			return productService.searchProductsByName(pageNo, pageSize, search, sortField);
		}
		return productService.searchProductsByNameInCategory(pageNo, pageSize, search, category, sortField);
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
