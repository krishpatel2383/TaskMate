package com.krish.TaskMate.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	private JavaMailSender javaMailSender;

	public EmailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	public void sendResetPasswordEmail(String to, String resetToken) {
		String subject = "Reset Password";
		String body = "Please use the following link to reset your account password : http://localhost:3000/" + to
				+ "/reset-password?token=" + resetToken;
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);
		javaMailSender.send(message);
	}
}
