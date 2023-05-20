package com.gifthomie.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthomie.backend.dto.APIPageableResponse;
import com.gifthomie.backend.entity.Product;
import com.gifthomie.backend.service.ProductService;

@RestController
@RequestMapping("/staff")
public class StaffController {
	@Autowired
	ProductService productService;
	
	@GetMapping("/product")
	public APIPageableResponse<Product> getProductList() {
		return productService.getPageableProducts(0, 12);
	}
}
