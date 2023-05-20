package com.gifthommie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifthommie.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}