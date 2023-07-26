package com.gifthommie.backend.controller;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.entity.OrderDetail;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.repository.OrderRepository;
import com.gifthommie.backend.service.MailService;
import com.gifthommie.backend.service.OrderService;
import com.gifthommie.backend.service.UserService;

@RestController
@RequestMapping("/staff/order")
public class StaffOrderController {
	@Autowired
	OrderService orderService;
	
	
	@Autowired
	JavaMailSender mailSender;
	
	@Autowired
	UserService userService;
	
	
	@Autowired
    MailService mailService;
	
	/// ------- NOTICE ------------- ///
		// Make sure name Orders Table in Database is Order
		// Make sure collum "status" in  Orders Table have data  [PENDING, CONFIRMED, DELIVERYING, SUCCSESSFUL, CANCELED]
		// Make sure ward_code, district_id, prodvince_id have data to avovoid error of My SQL
		
		
		// Get Order of Customer Pageable Without status              http://localhost:8080/staff/orders
		// Get Order of Customer Pageable satus is PENDING            http://localhost:8080/staff/order?status=PENDING
		// Get Order of Customer Pageable satus is CONFIRMED          http://localhost:8080/staff/order?status=CONFIRMED
		// Get Order of Customer Pageable satus is DELIVERYING        http://localhost:8080/staff/order?status=DELIVERYING
		// Get Order of Customer Pageable satus is SUCCSESSFUL        http://localhost:8080/staff/order?status=SUCCSESSFUL
		// Get Order of Customer Pageable satus is CANCELED           http://localhost:8080/staff/order?status=CANCELED
	@GetMapping
    public APIPageableResponseDTO<OrderDTO> getOrderList(
    		@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
            @RequestParam(defaultValue = "12", name = "size") Integer pageSize,
            @RequestParam(name = "status", required = false) String status){
//        User user = SecurityUtils.getPrincipal().getUser();
        //String email = user.getEmail();
		if(status!=null && status.isEmpty())
			status = null;
		
		if(status == null) {
//			orderService.getOrderDTOList_noEmail(pageNo, pageSize);
			return orderService.getOrderDTOList_noEmail(pageNo, pageSize);
		}
		
		orderService.getOrderDTOList_noEmail(0, 100, status); // FIRST-SHOT FOR AUTO-UPDATE
		return orderService.getOrderDTOList_noEmail(pageNo, pageSize, status); // SECOND-SHOT FOR RETURN
    }
		
		@GetMapping("/{orderId}")
		public OrderDTO viewOrderDetail(@PathVariable int orderId) {
			OrderDTO orderDTO = orderService.getOrderDTOByOrderId(orderId);
			
			if (orderDTO == null)
				throw new NotFoundException("ORDER CANNOT BE FOUND");
			
			return orderDTO;
		}
		
//	@PutMapping("/{orderID}")
//	public void updateOrderState(@PathVariable int orderID,@RequestParam int status,@RequestParam String comment) {
//		
//		String STATUS[] = {"PENDING","CONFIRMED","DELIVERYING","SUCCESSFUL","CANCELED"};
//		Orders order = orderService.getOrderByOrderId(orderID);
//		if (order == null)
//			throw new NotFoundException("ORDER CANNOT BE FOUND");
//		if (order.getStatus().equals(STATUS[0]) || order.getStatus().equals(STATUS[1]) || order.getStatus().equals(STATUS[2])) {
//			order.setStatus(STATUS[status]);
//			order.setComment(comment);
//			orderService.save(order);
//		}
//	}
		//UPDATE ORDER
		@PutMapping("/{orderId}")
		public OrderDTO updateOrder(@PathVariable Integer orderId, 
							@RequestBody OrderDTO orderDTO) {
			Orders order = orderService.getOrderByOrderId(orderId);
			//IF CANNOT FIND THE ORDER BY ID
			
			if (order == null)
				throw new NotFoundException("ORDER CANNOT BE FOUND");
			
			final boolean CONFIRM_MODE = orderDTO.getStatus().equals("PENDING") == false && order.getStatus().equals("PENDING");
//			Orders update = new Orders(orderDTO);
			order.autoUpdateFromDTO(orderDTO);	
			order.setComment(orderDTO.getComment());
			if (orderDTO.getShippingOrderCode() != null && orderDTO.getShippingOrderCode().length()>0)
				order.setShippingOrderCode(orderDTO.getShippingOrderCode());
			orderService.save(order);
//			if (order.getStatus().equals("CONFIRMED"))
			if (CONFIRM_MODE) {
				Thread newThread = new Thread(() -> {
					sendEmailConfirmOrder(order);
				});
				newThread.start();
			}
				
			
			return orderService.getOrderDTOByOrderId(orderId);
		}
		
//		@Async
		public void sendEmailConfirmOrder (Orders order) {	
			User u = new User();
			try {
				
					MimeMessage message = mailSender.createMimeMessage();
					MimeMessageHelper helper = new MimeMessageHelper(message,
												MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
												StandardCharsets.UTF_8.name());
					u = userService.getUserByEmail(order.getEmail());
					// Set người gửi, người nhận
					helper.setFrom("quyettcse160862@fpt.edu.vn");
					helper.setTo(order.getEmail());
					helper.setSubject("Đơn Hàng Mã Số #" + order.getId() + (order.getStatus().equals("CONFIRMED") ? " Đã Được Xác Nhận" : " Đã Bị Từ Chối"));
				    
					String confirmed_refuse = (order.getStatus().equals("CONFIRMED") 
							? "Đã Được Xác Nhận \nĐơn hàng của bạn được cập nhật vào lúc: "+ order.getLastUpdatedTime()  + "." 
							: "Đã Bị Từ Chối");
					String order_status_info = (order.getStatus().equals("CONFIRMED") 
							? "Nhân viên của shop đang chuẩn bị hàng và nhanh chóng gửi đi" + "\nThời gian giao hàng dự kiến cho đơn hàng của bạn là : "
								+ ""+ order.getExpectedDeliveryTime()  +"."
							: "Chú thích: " + order.getComment() + " \n Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất, xin lỗi vì sự bất tiện này!");
					
					// Truyền dữ liệu vào email
					Map<String, Object> variables = new HashMap<>();
					 	variables.put("user_name", u.getLastName());
					 	variables.put("order_id", order.getId());
			            variables.put("confirmed_refuse", confirmed_refuse);
			            variables.put("order_status_info", order_status_info);
			           
			        helper.setText(mailService.createContent("conform-order.html", variables), true);
					mailSender.send(message);    
			} catch (Exception e) {
				
			}
			
		
		}
}
