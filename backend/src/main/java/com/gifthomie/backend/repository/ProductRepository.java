package com.gifthomie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifthomie.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}