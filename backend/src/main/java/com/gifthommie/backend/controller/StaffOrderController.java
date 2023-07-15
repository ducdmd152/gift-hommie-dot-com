package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.entity.Orders;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.OrderService;

@RestController
@RequestMapping("/staff/order")
public class StaffOrderController {
	@Autowired
	OrderService orderService;
	
	
	@Autowired
	JavaMailSender mailSender;
	
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
            @RequestParam(name = "status", required = false) String status,
            @RequestParam(name = "search", defaultValue = "") String search){
//        User user = SecurityUtils.getPrincipal().getUser();
        //String email = user.getEmail();
		if(status!=null && status.isEmpty())
			status = null;
		
		if(status == null) {
//			orderService.getOrderDTOList_noEmail(pageNo, pageSize);
			return orderService.getOrderDTOList_noEmail_withSearch(pageNo, pageSize, search);
		}
		
		orderService.getOrderDTOList_noEmail_withSearch(0, 100, status, search); // FIRST-SHOT FOR AUTO-UPDATE
		return orderService.getOrderDTOList_noEmail_withSearch(pageNo, pageSize, status, search); // SECOND-SHOT FOR RETURN
    }
		
		@GetMapping("/{orderId}")
		public OrderDTO viewOrderDetail(@PathVariable int orderId) {
			OrderDTO orderDTO = orderService.getOrderDTOByOrderId(orderId);
			
			if (orderDTO == null)
				throw new NotFoundException("ORDER CANNOT BE FOUND");
			
			return orderDTO;
		}
		
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
			try {
			
				SimpleMailMessage message = new SimpleMailMessage();
				    message.setTo(order.getEmail());
				    message.setSubject("Đơn Hàng Mã Số #" + order.getId() + (order.getStatus().equals("CONFIRMED") ? " Đã Được Xác Nhận" : " Đã Bị Từ Chối"));

				    message.setText("Chào bạn,\n\nĐơn Hàng Mã Số #" + order.getId() + (order.getStatus().equals("CONFIRMED") ? " Đã Được Xác Nhận" : " Đã Bị Từ Chối")
				    		+ "\n\nĐơn hàng của bạn được cập nhật vào lúc: " +    order.getLastUpdatedTime()  + " ."
				    		+ (order.getStatus().equals("CONFIRMED") ? "\n\nNhân viên của shop đang chuẩn bị hàng và nhanh chóng gửi đi\n\n" + "Thời gian giao hàng dự kiến cho đơn hàng của bạn là : "+ order.getExpectedDeliveryTime()  +"."
				    					: "Lí do từ chối: Sản phẩm đang tạm hết hàng, chúng tôi sẽ liên hệ trong thời gian sớm nhất, xin lỗi vì sự bất tiện này!") 
				    		
				    		+ "\n\nCảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi"
				    		+ "\n\nTrân trọng,\nHommieStore");
				    mailSender.send(message);			
			} catch (Exception e) {
					
			}
			
		
		}
}
