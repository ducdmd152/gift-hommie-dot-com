package com.gifthommie.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableDTO;
import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.FeedbackDTO;
import com.gifthommie.backend.dto.ProductReportDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.OrderDetailRepository;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.repository.UserRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService {
	@Autowired
	OrderDetailRepository orderDetailRepository;
	@Autowired
	OrderRepository orderRepository;
	@Autowired
	UserRepository userRepository;

	@Override
	public Page<FeedbackDTO> getFeedbackByProductId(int pageNo, int pageSize, int productId) {
		Page<OrderDetail> page = orderDetailRepository.findRatedOrderDetailsByProductId(PageRequest.of(pageNo, pageSize),
				productId);

		List<FeedbackDTO> feedbacks = new ArrayList<>();

		for (OrderDetail o : page) {
			String email = orderRepository.findOrderByOrderId(o.getOrderId()).getEmail();
			User user = userRepository.getUserByEmail(email);
			FeedbackDTO f = new FeedbackDTO(user, o.getRating(), o.getFeedback(), o.getFeedbackTime());

			feedbacks.add(f);
		}

		Page<FeedbackDTO> paging = new PageImpl<>(feedbacks, page.getPageable(), feedbacks.size());
		return paging;
	}

	@Override
	public ProductReportDTO getProductReportByProductId(int productId) {
		ProductReportDTO p = new ProductReportDTO();
		Integer sold = orderDetailRepository.getSoldProductQuantityByProductId(productId);
		
		sold = (sold == null) ? 0 : sold;
		
		p.setSold(sold);
		p.setRating((sold == 0) ? 5 : orderDetailRepository.getAverageRatingByProductId(productId));
		
		return p;
	}

	
}
