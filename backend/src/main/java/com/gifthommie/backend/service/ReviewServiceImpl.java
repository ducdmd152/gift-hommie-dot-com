package com.gifthommie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.RatingRequestDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Review;
import com.gifthommie.backend.repository.OrderDetailRepository;
import com.gifthommie.backend.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	ReviewRepository reviewRepository;
	@Autowired
	OrderDetailRepository orderDetailRepository;
	
	@Override
	public void save(RatingRequestDTO ratingRequestDTO, String email) {
		// TODO Auto-generated method stub
		Review review = new Review(ratingRequestDTO, email);
		//Luu review, orderDetail object
		OrderDetail orderDetail = orderDetailRepository.findOrderDetailById(ratingRequestDTO.getOrderDetailID());
		review.setOrderDetail(orderDetail);
		
		reviewRepository.save(review);
	}
	
	//Find enable reviews
	@Override
	public APIPageableResponseDTO<Review> findReviewsByProductId(int pageNo, int pageSize, int productId, int enable) {
		Page<Review> p = reviewRepository.findReviewsByProductId(PageRequest.of(pageNo, pageSize, Sort.by("id").descending()), productId, enable);
		return new APIPageableResponseDTO<Review>(p);
	}

}
