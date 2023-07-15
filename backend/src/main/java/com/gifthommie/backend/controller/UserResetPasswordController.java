package com.gifthommie.backend.controller;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.VerifyPasswordDTO;
import com.gifthommie.backend.entity.User;
import com.gifthommie.backend.repository.UserRepository;
import com.gifthommie.backend.service.MailService;
import com.gifthommie.backend.service.UserService;

import net.bytebuddy.utility.RandomString;

@RestController
@RequestMapping("public/account/reset")
public class UserResetPasswordController {

	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	JavaMailSender mailSender;
	
	
	@Autowired
    MailService  mailService;
	
	
	
	// http://localhost:8080/account/reset_password
	
//	{
//		"email": "www.tranlenovo123@gmail.com"
//		
//	}
	// Hàm này để người dùng click vào để hệ thống gửi token qua email của họ
	@PostMapping("/password/request")
	public String process_forgotPassword (@RequestBody VerifyPasswordDTO verifyPasswordDTO) {	
		String token  = RandomString.make(7);
		User u = new User();
		try {
//			userService.updateResetPassword(token, verifyPasswordDTO.getEmail());
//			u = userService.getUserByEmail(verifyPasswordDTO.getEmail());
//			
//			// Phần url tạm để là local host
//			String resetPasswordLink = "http://localhost:8080/account/reset_password?token=" + token;
//			SimpleMailMessage message = new SimpleMailMessage();
//			    message.setTo(verifyPasswordDTO.getEmail());
//			    message.setSubject("Reset Password");
//			    
//			    // Phần này là chổ gửi kèm link và code token
//			    //message.setText(MessageFormat.format(resetPasswordLink, token));
//			
//			    message.setSubject("Đặt lại mật khẩu");
//
//			    message.setText("Chào bạn,\n\nBạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình tại HommieStore. "
//			    		+ "\n\nMã xác nhận của bạn là: [ "  + token + " ]  ."
//			    		+ "\n\nĐể tiếp tục quá trình đặt lại mật khẩu, vui lòng nhấp vào liên kết bên dưới và nhập mã thông báo khi được yêu cầu:\n\n" + resetPasswordLink 
//			    		+ "\n\nMã thông báo của bạn sẽ hết hạn vào lúc "
//			    		+ "\n\n[" + u.getExpired_verification_code() + "]. "
//			    		+ "\nVui lòng đặt lại mật khẩu của bạn trước khi thời gian này kết thúc."
//			    		+ "\nNếu bạn không yêu cầu đặt lại mật khẩu này, vui lòng bỏ qua email này. "
//			    		+ "Nếu bạn tin rằng có ai đó đang cố gắng truy cập vào tài khoản của bạn, vui lòng liên hệ với chúng tôi ngay lập tức để được trợ giúp."
//			    		+ "\n\nTrân trọng,\nHommieStore");
			userService.updateResetPassword(token, verifyPasswordDTO.getEmail());
			u = userService.getUserByEmail(verifyPasswordDTO.getEmail());

			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message,
										MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
										StandardCharsets.UTF_8.name());
			
			// Set người gửi, người nhận
			helper.setFrom("quyettcse160862@fpt.edu.vn");
			helper.setTo(verifyPasswordDTO.getEmail());
			helper.setSubject("Đặt lại mật khẩu tài khoản");
			// truyền dữ liệu vào template có sẵn
			 Map<String, Object> variables = new HashMap<>();
	            variables.put("user_name", u.getLastName());
	            variables.put("token", token);
	            variables.put("getExpired_verification_code", u.getExpired_verification_code());

			helper.setText(mailService.createContent("create-customer-mail-template.html", variables), true);
			
			mailSender.send(message);

					
		} catch (Exception e) {
			return e.getMessage();			
		}
		
		// Phần này là link nhận reset password
		// send email	
		// return này để test xem email và token in ra như thế nào
		return verifyPasswordDTO.getEmail() +"-"+ token +"-"+ u.getExpired_verification_code();
	}
	
	
	
	
	
	
	//Get       http://localhost:8080/account/reset_password?token=9lEjKGw
	
	// Cái mã token có thể thấy ở Mail người nhận hoặc kết quả trả về của hàm process_forgotPassword
	// Hàm này để check kết quả của người dùng sao khi nhập token
	// Sau khi hàm này chạy chạy ok thì mới tiếp tục xuống hàm processResetPwd phía dưới
	@PostMapping("/password/token/check")
	public ResponseEntity<String> showResetPasswordForm(@RequestBody VerifyPasswordDTO verifyPasswordDTO) {
		String token = verifyPasswordDTO.getToken();
		User user= userService.getResetPasswordToken(token); // lấy ra user với token vừa nhập
		User timeUserToken = userService.getExTime(token);   // lấy ra user với thời gian quá hạn
		if(user != null && timeUserToken != null) {
			return ResponseEntity.ok("Correct"); // nhập đúng token và ko quá thời gian
		}else if(user!=null && timeUserToken == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Het thoi gian ma code"); // hết thời gian của token
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("sai ma code"); // sai token
	}
	
	
	
	
	
	

	
	// json value
	/* 
	 * {
		"token": "Zvv8GSC",
        "password": 12345678	
		} 
	*/

	// Hàm này được gọi ở trang mới, cho phép người dùng nhập mật mới
	// http://localhost:8080/account/reset_password/reset_page
	@PostMapping("/password/reset")
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
