package com.krish.TaskMate.Controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krish.TaskMate.Model.ResetPasswordRequest;
import com.krish.TaskMate.Model.User;
import com.krish.TaskMate.Service.UserService;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userService.getUserById(id);
		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User user, Model model) {
		User existingUser = userService.getUserByEmail(user.getEmail());
		if (existingUser != null) {
			userService.validateCredentials(user.getEmail(), user.getPassword());
			existingUser.setId(existingUser.getId());
			model.addAttribute("userEmail", existingUser.getEmail());
			return ResponseEntity.ok(existingUser);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<User> createUser(@Valid @RequestBody User user, Model model) {
		User createdUser = userService.createUser(user);
		model.addAttribute("userEmail", user.getEmail());
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody User user) {
		Dotenv dotenv = Dotenv.load();
		String sendgridApiKey = dotenv.get("SENDGRID_API_KEY");
		String resetToken = userService.generateResetToken(user.getEmail());
		String fromEmail = "krish.taskmate@gmail.com";
		String toEmail = user.getEmail();
		String subject = "Reset Password";
		String message = "Please use the following link to reset your account password:\n http://localhost:3000/"
				+ user.getEmail() + "/reset-password?token=" + resetToken;

		Email from = new Email(fromEmail);
		Email to = new Email(toEmail);
		Content content = new Content("text/plain", message);
		Mail mail = new Mail(from, subject, to, content);
		SendGrid sg = new SendGrid(sendgridApiKey);
		Request request = new Request();
		try {
			request.setMethod(Method.POST);
			request.setEndpoint("mail/send");
			request.setBody(mail.build());
			Response response = sg.api(request);
			return ResponseEntity.ok().build();
		} catch (IOException ex) {
			// Handle SendGrid exception
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
		userService.resetPassword(resetPasswordRequest.getEmail(), resetPasswordRequest.getResetToken(),
				resetPasswordRequest.getNewPassword());
		return ResponseEntity.ok().build();
	}
}