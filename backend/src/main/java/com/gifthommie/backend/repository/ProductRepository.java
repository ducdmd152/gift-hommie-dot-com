package com.gifthommie.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	public Page<Product> findAllByStatus(boolean status, PageRequest pageRequest);
	
	@Query("SELECT p FROM Product p WHERE p.status = :status AND p.category.id = :category AND p.name LIKE %:search%")
	public Page<Product> findAllByStatusByNameByCategory(@Param("status") boolean status,@Param("search") String search,@Param("category") Integer category, PageRequest pageRequest);
	
	@Query("SELECT p FROM Product p WHERE p.name LIKE %:search% and p.status = :status")
	public Page<Product> finfAllByName(PageRequest pageRequest,@Param("search") String search, @Param("status") boolean status);
}