package com.gifthommie.backend.service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Category;

public interface CategoryService {
	public APIPageableResponseDTO<Category> getPageableCategories();

	public Category save(Category category);

	public void remove(int id);
}
