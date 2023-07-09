package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.OrderDTO;
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
}
