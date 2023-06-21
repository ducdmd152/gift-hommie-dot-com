package com.gifthommie.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.dto.APIPageableDTO;
import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.FeedbackDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.OrderDetailRepository;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.repository.UserRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService{
	@Autowired
	OrderDetailRepository orderDetailRepository;
	@Autowired
	OrderRepository orderRepository;
	@Autowired
	UserRepository userRepository;
	
	@Override
	public List<FeedbackDTO> getFeedbackByProductId(int pageNo, int pageSize, int productId) {
		Page<OrderDetail> page = orderDetailRepository.findOrderDetailsByProductId(
				PageRequest.of(pageNo, pageSize), productId);
		
		List<FeedbackDTO> feedbacks = new ArrayList<>();
		
		for (OrderDetail o : page)
			if (o.getRating() != null && o.getRating() != 0) {
				String email = orderRepository.findOrderByOrderId(o.getOrderId()).getEmail();
				User user = userRepository.getUserByEmail(email);
				FeedbackDTO f = new FeedbackDTO(user, o.getRating(), o.getFeedback());
				
				feedbacks.add(f);
			}
		
//		APIPageableResponseDTO<FeedbackDTO> p = new APIPageableResponseDTO<>();
//		
//		p.setPageable(new APIPageableDTO(page));
//		p.setContent(feedbacks);
		return feedbacks;
	}

}
