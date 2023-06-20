package com.gifthommie.backend.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.VerifyPasswordDTO;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.UserRepository;
import com.gifthommie.backend.service.UserService;

import net.bytebuddy.utility.RandomString;

@RestController
@RequestMapping("/account/forgotPassword")
public class ForgotPasswordController {

	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
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
	
	@GetMapping()
	public ResponseEntity<String> showResetPasswordForm(@RequestParam String token) {
		User user= userService.getResetPasswordToken(token);
		User timeUserToken = userService.getExTime(token);
		if(user != null && timeUserToken != null) {
			return ResponseEntity.ok("Correct");
		}else if(user!=null && timeUserToken == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Het thoi gian ma code");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("sai ma code");
	}
	
	@PostMapping
	public String processResetPwd(@RequestBody VerifyPasswordDTO verifyPasswordDTO) {
		User user = userService.getResetPasswordToken(verifyPasswordDTO.getToken());
		if(user == null) {
			return "something went wrong";
		}else {
			userService.updateUserPassword(user, verifyPasswordDTO.getPassword());
			return "Reset password successful";
		}
	}
}
