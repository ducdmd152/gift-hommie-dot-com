package com.gifthommie.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	public Page<Product> findAllByStatus(boolean status, PageRequest pageRequest);
	
	@Query("SELECT p FROM Product p JOIN p.category c WHERE c.status = true AND p.status = :status AND p.category.id = :category AND p.name LIKE %:search%")
	public Page<Product> findAllByStatusByNameByCategory(@Param("status") boolean status, @Param("search") String search, @Param("category") Integer category, Pageable pageable);

	@Query("SELECT p FROM Product p JOIN p.category c WHERE c.status = true AND p.category.id = :category AND p.name LIKE %:search%")
	public Page<Product> findAllByStatusByNameByCategory( @Param("search") String search, @Param("category") Integer category, Pageable pageable);
	
	@Query("SELECT p FROM Product p JOIN p.category c WHERE c.status = true AND p.name LIKE %:search% AND p.status = :status")
	public Page<Product> findAllByName(@Param("status") boolean status, @Param("search") String search, Pageable pageable);
	
	@Query("SELECT p FROM Product p JOIN p.category c WHERE c.status = true AND p.name LIKE %:search%")
	public Page<Product> findAllByName(@Param("search") String search, Pageable pageable);

	
	// related chính productID, từ đó lấy ra sản phẩm tương tự với cateID của product ID đó
//	@Query("SELECT p FROM Product p WHERE p.category.id = (SELECT p2.category.id FROM Product p2 WHERE p2.id = :realated) AND p.status = :status ORDER BY RAND()")
//	public Page<Product> finfAllByRealated(@Param("status") boolean status,@Param("realated") int realated,PageRequest pageRequest);
	@Query("SELECT p FROM Product p JOIN p.category c WHERE c.status = true AND p.category.id = (SELECT p2.category.id FROM Product p2 WHERE p2.id = :related) AND p.status = :status ORDER BY RAND()")
	public Page<Product> findAllByRelated(@Param("status") boolean status, @Param("related") int related, PageRequest pageRequest);

	
	@Query("SELECT p FROM Product p WHERE p.id = :productId AND p.status = :status")
	public Product findProductById(@Param("productId") int productId, 
									@Param("status") boolean status);
	
	@Query("SELECT DISTINCT p "
			+ "FROM Product p "
			+ " JOIN OrderDetail od ON p.id = od.productId"
			+ " JOIN Orders o ON od.orderId = o.id"
			+ " JOIN User u ON o.email = u.email"
			+ " WHERE u.email = :email"
			+ " Order by p.id asc")
	public List<Product> findProductByEmai(@Param("email") String email);
	
	@Query("SELECT SUM(od.price*od.quantity) "
			+ "FROM Product p "
			+ " JOIN OrderDetail od ON p.id = od.productId"
			+ " JOIN Orders o ON od.orderId = o.id"
			+ " JOIN User u ON o.email = u.email"
			+ " WHERE u.email = :email")
	public Long findAmountByEmail(@Param("email") String email);
}