package com.krish.TaskMate.Controller;

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
import com.krish.TaskMate.Service.EmailService;
import com.krish.TaskMate.Service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private EmailService emailService;

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
		String resetToken = userService.generateResetToken(user.getEmail());
		emailService.sendResetPasswordEmail(user.getEmail(), resetToken);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
		userService.resetPassword(resetPasswordRequest.getEmail(), resetPasswordRequest.getResetToken(),
				resetPasswordRequest.getNewPassword());
		return ResponseEntity.ok().build();
	}
}