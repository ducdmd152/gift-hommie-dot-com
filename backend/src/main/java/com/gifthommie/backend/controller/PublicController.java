package com.gifthommie.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.FeedbackDTO;
import com.gifthommie.backend.dto.ProductReportDTO;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.entity.Review;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.FeedbackService;
import com.gifthommie.backend.service.OrderDetailService;
import com.gifthommie.backend.service.ProductService;
import com.gifthommie.backend.service.ReviewService;

@RestController
@RequestMapping("/public/product")
public class PublicController {
	@Autowired
	ProductService productService;
	
	@Autowired
	ReviewService reviewService;
	
	@Autowired
	FeedbackService feedbackService;
	
	private final int ENABLED_REVIEW = 1;

	//------------ Default DES------------------------------
			//List Product 				            : http://localhost:8080/staff/product
			//List Product Filter Sort By Name      : http://localhost:8080/staff/product?sort=name-des
			//List Product Filter Sort By Price     : http://localhost:8080/staff/product?sort=price-des
			
			//List Product By Category and Filter Sort By Price  : http://localhost:8080/staff/product?category=1&sort=price-des
			//List Product By Category and Filter Sort By Name   : http://localhost:8080/staff/product?category=1&sort=name-des
			
			//List Product By Category and Filter Sort By Price with Search  : http://localhost:8080/staff/product?category=1&sort=price-des&search=a
			//List Product By Category and Filter Sort By Price with Search  : http://localhost:8080/staff/product?category=1&sort=name-des&search=a
		
		
		//-----------Optional ASC		------------------------------
			//List Product 				            : http://localhost:8080/staff/product
			//List Product Filter Sort By Name      : http://localhost:8080/staff/product?sort=name-asc
			//List Product Filter Sort By Price     : http://localhost:8080/staff/product?sort=price-asc
			
			//List Product By Category and Filter Sort By Price  : http://localhost:8080/staff/product?category=1&sort=price-asc
			//List Product By Category and Filter Sort By Name   : http://localhost:8080/staff/product?category=1&sort=name-asc
			
			//List Product By Category and Filter Sort By Price with Search  : http://localhost:8080/staff/product?category=1&sort=price-asc&search=a
			//List Product By Category and Filter Sort By Price with Search  : http://localhost:8080/staff/product?category=1&sort=name-asc&search=a
	
	@GetMapping
	public APIPageableResponseDTO<Product> getProductList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			@RequestParam(defaultValue = "", name = "search") String search,
			@RequestParam(name = "category", required = false) Integer category,
			@RequestParam(name = "sort", defaultValue = "id") String sortField,
			@RequestParam(name = "order", required = false) Boolean sortOrder,
			@RequestParam(name = "related", required = false) Integer related
			) {
		if (related != null && related != 0) {
			return productService.getProductByRelated(pageNo, pageSize, related);
		}

		if(category == null || category==0) {
			return productService.searchProductsByName(pageNo, pageSize, search, sortField);
		}
		return productService.searchProductsByNameInCategory(pageNo, pageSize, search, category, sortField);
	}
	
	//View Product Detail: get product by id
	//http://localhost:8080/public/product/6
	@GetMapping("/{productId}")
	public Product getProduct(@PathVariable int productId) {
		if(productService.checkExist(productId) == false) {
			throw new NotFoundException("Product not found!!!");
		}
		return productService.getProductById(productId);
	}
	
//	@GetMapping("/review/{productId}")
//	public APIPageableResponseDTO<Review> getReviewOfProduct(
//			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
//			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
//			@PathVariable int productId) {
//		
//		return reviewService.findReviewsByProductId(pageNo, pageSize, productId, ENABLED_REVIEW);
//	}
	
	@GetMapping("/feedback/{productId}")
	public APIPageableResponseDTO<FeedbackDTO> getFeedbackByProductId(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			@PathVariable int productId) {
		
		return new APIPageableResponseDTO<>(feedbackService.getFeedbackByProductId(pageNo, pageSize, productId));
	}
	
	@GetMapping("/feedback/additional/{productId}")
	public ProductReportDTO getProductReportById(@PathVariable Integer productId) {
		return feedbackService.getProductReportByProductId(productId);
	}
	
}
