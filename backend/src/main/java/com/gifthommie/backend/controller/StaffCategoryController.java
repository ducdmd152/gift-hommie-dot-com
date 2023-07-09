package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.ProductRequestDTO;
import com.gifthommie.backend.entity.Category;
import com.gifthommie.backend.service.CategoryService;

@RestController
@RequestMapping("/staff/category")
public class StaffCategoryController {
	@Autowired
	CategoryService categoryService;
	
	@GetMapping
	public APIPageableResponseDTO<Category> getCategories() {		
		return categoryService.getPageableCategories();
	}
	
	@PostMapping
	public Category addCategory(@RequestBody Category category) {
		category.setId(0);
		return categoryService.save(category);
	}
	
	@PutMapping("/{id}")
	public Category updateCategory(@PathVariable int id, @RequestBody Category category) {
		category.setId(id);
		return categoryService.save(category);
	}
	
	@DeleteMapping("/{id}")
	public void deleteCategory(@PathVariable int id) {
		categoryService.remove(id);
	}
}
