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
	
	
	// Notion--- MỌI THỨ VỚI ĐIỀ KIỆN BÌNH THƯỜNG ĐỀU SẼ SORT GIẢM DẦN
	// Notion--- SORT TĂNG DẦN SẼ LÀ MỘT OPTIONAL VỚI sort_asc
	
	
	//  ----------------------   Search Product                  --------------------------
	// Search Product                       : http://localhost:8080/staff/product?search=mô hình
	// Search Product with Category         : http://localhost:8080/staff/product?search=b&category=1
	
	
	
	//  --------------------  Default listed by Descending    --------------------------
	//List Product 				            : http://localhost:8080/staff/product
	//List Product By Category              : http://localhost:8080/staff/product?category=1
	
	//List Product Filter Sort By Price des              : http://localhost:8080/staff/product?sort_des=price
	//List Product By Category and Sort By Price des     : http://localhost:8080/staff/product?category=1&sort_des=price
	
	
	
	// --------------------  Optional listed by Ascending    --------------------------
	//List Product Filter Sort By Price asc              : http://localhost:8080/staff/product?sort_asc=price
	//List Product By Category and Sort By Price asc     : http://localhost:8080/staff/product?sort_asc=price&category=1&search=cốc
	
	
	
	
	@GetMapping
	public APIPageableResponseDTO<Product> getProductList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			@RequestParam(defaultValue = "", name = "search") String search,
			@RequestParam(name = "category", required = false) Integer category,
			@RequestParam(name = "sort_des", defaultValue = "id") String sortField_des,
			@RequestParam(name = "sort_asc", required = false) String sortField_asc,
			@RequestParam(name = "order", required = false) Boolean sortOrder
			) {
		
			// Auto sort Des, nếu sortField_asc == null thì sort des, else thì sort asc
			if(category == null || category==0) {
				return productService.searchProductsByName(pageNo, pageSize, search, sortField_des, sortField_asc);
			}
			return productService.searchProductsByNameInCategory(pageNo, pageSize, search, category, sortField_des, sortField_asc);
	

	}
	
	@GetMapping("/{productId}")
	public Product getProduct(@PathVariable int productId) {
		if(productService.checkExist(productId) == false) {
			throw new NotFoundException("Product not found!!!");
		}
		return productService.getProductById(productId);
	}
	
	@PostMapping
	public Product addProduct(@RequestBody ProductRequestDTO productRequestDTO) {
		Product result = productService.createNewProductFrom(productRequestDTO);
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
