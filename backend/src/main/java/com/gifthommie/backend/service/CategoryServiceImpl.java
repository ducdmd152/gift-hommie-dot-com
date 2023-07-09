package com.gifthommie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Category;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public APIPageableResponseDTO<Category> getPageableCategories() {
		// TODO Auto-generated method stub
		Page<Category> page = categoryRepository.findAll(
				PageRequest.of(0, 1000000)
				);
		return new APIPageableResponseDTO<Category>(page);
	}

	@Override
	public Category save(Category category) {
		// TODO Auto-generated method stub
		return categoryRepository.save(category);
	}

	@Override
	public void remove(int id) {
		// TODO Auto-generated method stub
		categoryRepository.deleteById(id);
	}
	
	

}
