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
			String resetPasswordLink = "http://localhost:8080/account/forgotPassword";
			SimpleMailMessage message = new SimpleMailMessage();
			    message.setTo(email);
			    message.setSubject("Reset Password");
			    
			    // Phần này là chổ gửi kèm link và code token
			    //message.setText(MessageFormat.format(resetPasswordLink, token));
			    message.setText("Chào bạn, reset mật khẩu đê, token nè: [ " + token + " ]. Token sẽ hết hạn vào lúc: " + u.getExpired_verification_code() );
			    
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
