package com.gifthommie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifthommie.backend.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

}
