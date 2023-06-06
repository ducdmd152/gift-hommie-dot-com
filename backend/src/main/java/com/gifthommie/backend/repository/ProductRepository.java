package com.gifthommie.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	public Page<Product> findAllByStatus(boolean status, PageRequest pageRequest);
	
	@Query("SELECT p FROM Product p WHERE p.status = :status AND p.category.id = :category AND p.name LIKE %:search%")
	public Page<Product> findAllByStatusByNameByCategory(@Param("status") boolean status,@Param("search") String search,@Param("category") Integer category
			, Pageable pageable);
	
	@Query("SELECT p FROM Product p WHERE p.name LIKE %:search% and p.status = :status")
	public Page<Product> finfAllByName(@Param("status") boolean status,@Param("search") String search,Pageable pageable);
	
	// related chính productID, từ đó lấy ra sản phẩm tương tự với cateID của product ID đó
	@Query("SELECT p FROM Product p WHERE p.category.id = (SELECT p2.category.id FROM Product p2 WHERE p2.id = :realated) AND p.status = :status ORDER BY RAND()")
	public Page<Product> finfAllByRealated(@Param("status") boolean status,@Param("realated") int realated,PageRequest pageRequest);
	
	@Query("SELECT p FROM Product p WHERE p.id = :productId AND p.status = :status")
	public Product findProductById(@Param("productId") int productId, 
									@Param("status") boolean status);
}