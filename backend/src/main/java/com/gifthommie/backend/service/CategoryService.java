package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Category;
import com.gifthommie.backend.entity.Product;

public interface CategoryService {
	public APIPageableResponseDTO<Category> getPageableCategories();

	public Category save(Category category);

	public void remove(int id);
}
