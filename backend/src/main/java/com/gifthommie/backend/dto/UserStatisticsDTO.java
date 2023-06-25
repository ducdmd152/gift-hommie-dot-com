package com.gifthommie.backend.dto;

import java.util.ArrayList;
import java.util.List;

import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.User;

public class UserStatisticsDTO {
	
	private Order order;	
	
	public UserStatisticsDTO() {
		super();
		order = new Order();
	}
	
	
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}


	public static class Order{
		private List<UserTopOrderDTO> userTopOrderDTOList;

		public Order() {
			super();
			userTopOrderDTOList = new ArrayList<>();
		}

		public List<UserTopOrderDTO> getUserTopOrderDTOList() {
			return userTopOrderDTOList;
		}

		public void setUserTopOrderDTOList(List<UserTopOrderDTO> userTopOrderDTOList) {
			this.userTopOrderDTOList = userTopOrderDTOList;
		}
		
	}
	public static class UserTopOrderDTO{
		private User user;
		private List<Orders> orderList;
		
		
		
		public UserTopOrderDTO(User user, List<Orders> orderList) {
			super();
			this.user = user;
			this.orderList = orderList;
		}

		public UserTopOrderDTO() {
			super();
			orderList = new ArrayList<>();
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public List<Orders> getOrderList() {
			return orderList;
		}

		public void setOrderList(List<Orders> orderList) {
			this.orderList = orderList;
		}
		
	}
}
