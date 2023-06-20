package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.service.UserService;

import net.bytebuddy.utility.RandomString;

@RestController
@RequestMapping("/account/forgotPassword")
public class ForgotPasswordController {

	@Autowired
	UserService userService;
	
	@Autowired
	JavaMailSender mailSender;
	
	@PostMapping("/{email}")
	public String process_forgotPassword (@PathVariable String email) {	
		String token  = RandomString.make(7);
		User u = new User();
		try {
			userService.updateResetPassword(token, email);
			u = userService.getUserByEmail(email);
			// Phần url tạm để là local host
			
			String resetPasswordLink = "http://localhost:8080/account/forgotPassword?token=" + token;
			SimpleMailMessage message = new SimpleMailMessage();
			    message.setTo(email);
			    message.setSubject("Reset Password");
			    
			    // Phần này là chổ gửi kèm link và code token
			    //message.setText(MessageFormat.format(resetPasswordLink, token));
			
			    message.setSubject("Đặt lại mật khẩu");

			    message.setText("Chào bạn,\n\nBạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình tại HommieStore. "
			    		+ "\n\nMã xác nhận của bạn là: [ "  + token + " ]  ."
			    		+ "\n\nĐể tiếp tục quá trình đặt lại mật khẩu, vui lòng nhấp vào liên kết bên dưới và nhập mã thông báo khi được yêu cầu:\n\n" + resetPasswordLink 
			    		+ "\n\nMã thông báo của bạn sẽ hết hạn vào lúc "
			    		+ "\n\n[" + u.getExpired_verification_code() + "]. "
			    		+ "\nVui lòng đặt lại mật khẩu của bạn trước khi thời gian này kết thúc."
			    		+ "\nNếu bạn không yêu cầu đặt lại mật khẩu này, vui lòng bỏ qua email này. "
			    		+ "Nếu bạn tin rằng có ai đó đang cố gắng truy cập vào tài khoản của bạn, vui lòng liên hệ với chúng tôi ngay lập tức để được trợ giúp."
			    		+ "\n\nTrân trọng,\nHommieStore");

			    mailSender.send(message);			
		} catch (Exception e) {
			return e.getMessage();
			
		}
		
		// Phần này là link nhận reset password
		// send email	
		// return này để test xem email và token in ra như thế nào
		return email +"-"+ token +"-"+ u.getExpired_verification_code();
	}
	
	
}
