package com.gifthommie.backend.repository;

import java.awt.print.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gifthommie.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	public Page<Product> findAllByStatus(boolean status, PageRequest pageRequest);
}