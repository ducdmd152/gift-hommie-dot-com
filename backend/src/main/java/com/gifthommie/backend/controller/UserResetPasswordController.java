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
public class UserResetPasswordController {

	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	JavaMailSender mailSender;
	
	
	// http://localhost:8080/account/forgotPassword/www.tranlenovo123@gmail.com
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
	
	
	
	//Get       http://localhost:8080/account/forgotPassword?token=9lEjKGw
	
	// Cái mã token có thể thấy ở Mail người nhận hoặc kết quả trả về của hàm process_forgotPassword
	// Hàm này để check kết quả của người dùng sao khi nhập token
	// Sau khi hàm này chạy chạy ok thì mới tiếp tục xuống hàm processResetPwd phía dưới
	@GetMapping()
	public ResponseEntity<String> showResetPasswordForm(@RequestParam String token) {
		User user= userService.getResetPasswordToken(token); // lấy ra user với token vừa nhập
		User timeUserToken = userService.getExTime(token);   // lấy ra user với thời gian quá hạn
		if(user != null && timeUserToken != null) {
			return ResponseEntity.ok("Correct"); // nhập đúng token và ko quá thời gian
		}else if(user!=null && timeUserToken == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Het thoi gian ma code"); // hết thời gian của token
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("sai ma code"); // sai token
	}
	
	
	// Hàm này dùng để chỉnh mật khẩu mới
	// Post Maping
	// Post       http://localhost:8080/account/forgotPassword
	
	// json value
	/* 
	 * {
		"token": "Zvv8GSC",
        "password": 12345678	
		} 
	*/
	@PostMapping
	public String processResetPwd(@RequestBody VerifyPasswordDTO verifyPasswordDTO) {
		User user = userService.getResetPasswordToken(verifyPasswordDTO.getToken());
		if(user == null) {
			return "something went wrong";
		}else {
			//									 verifyPasswordDTO.getPassword() là password mới
			userService.updateUserPassword(user, verifyPasswordDTO.getPassword());
			return "Reset password successful";
		}
	}
}
