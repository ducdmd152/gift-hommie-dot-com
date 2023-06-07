package com.gifthommie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifthommie.backend.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

}
