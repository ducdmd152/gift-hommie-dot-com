package com.gifthommie.backend.dto;

import java.util.ArrayList;
import java.util.List;

import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.entity.User;

public class UserStatisticsDTO {
	
	private Order order;	
	private ProductDTO product;
	private AmountDTO amountDTO;
	
	public UserStatisticsDTO() {
		super();
		order = new Order();
		product  = new ProductDTO();
		amountDTO = new AmountDTO();
	}
	
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}

	public ProductDTO getProduct() {
		return product;
	}

	public void setProduct(ProductDTO productDTO) {
		this.product = productDTO;
	}

	public AmountDTO getAmountDTO() {
		return amountDTO;
	}

	public void setAmountDTO(AmountDTO amountDTO) {
		this.amountDTO = amountDTO;
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
	
	public static class ProductDTO{
		List<UserTopProductDTO> userTopProductDTOList;

		public ProductDTO() {
			super();
			userTopProductDTOList = new ArrayList<>();
		}

		public List<UserTopProductDTO> getUserTopProductDTOList() {
			return userTopProductDTOList;
		}

		public void setUserTopProductDTOList(List<UserTopProductDTO> userTopProductDTOList) {
			this.userTopProductDTOList = userTopProductDTOList;
		}
	}
	
	public static class UserTopProductDTO{
		private User user;
		private List<Product> product;
		
		public UserTopProductDTO() {
			super();
			product = new ArrayList<>();
		}
		
		
		public UserTopProductDTO(User user, List<Product> product) {
			super();
			this.user = user;
			this.product = product;
		}


		public User getUser() {
			return user;
		}
		public void setUser(User user) {
			this.user = user;
		}
		public List<Product> getProduct() {
			return product;
		}
		public void setProduct(List<Product> product) {
			this.product = product;
		}
	}
	
	public static class AmountDTO{
		List<UserTopAmountDTO> userTopAmountDTOList;

		public AmountDTO() {
			super();
			userTopAmountDTOList = new ArrayList<>();
		}

		public List<UserTopAmountDTO> getUserTopAmountDTOList() {
			return userTopAmountDTOList;
		}

		public void setUserTopAmountDTOList(List<UserTopAmountDTO> userTopAmountDTOList) {
			this.userTopAmountDTOList = userTopAmountDTOList;
		}
		
		
		
		
	}
	public static class UserTopAmountDTO{
		private User user;
		private Long amount;
		
		public UserTopAmountDTO() {
			super();
		}
		public UserTopAmountDTO(User user, Long amount) {
			super();
			this.user = user;
			this.amount = amount;
		}
		public User getUser() {
			return user;
		}
		public void setUser(User user) {
			this.user = user;
		}
		public Long getAmount() {
			return amount;
		}
		public void setAmount(Long amount) {
			this.amount = amount;
		}
		
		
	}
}
