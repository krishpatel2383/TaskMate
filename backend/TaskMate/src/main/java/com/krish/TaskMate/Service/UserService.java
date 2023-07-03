package com.krish.TaskMate.Service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import com.krish.TaskMate.Exceptions.DuplicateUserException;
import com.krish.TaskMate.Exceptions.InvalidResetTokenException;
import com.krish.TaskMate.Exceptions.UserNotFoundException;
import com.krish.TaskMate.Model.User;
import com.krish.TaskMate.Repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User getUserById(Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		if (userOptional.isPresent()) {
			return userOptional.get();
		} else {
			throw new UserNotFoundException("User not found with id: " + id);
		}
	}

	public User getUserByEmail(String email) {
		Optional<User> userOptional = userRepository.findByEmail(email);
		if (userOptional.isPresent()) {
			return userOptional.get();
		} else {
			throw new UserNotFoundException("User not found.");
		}
	}

	public User createUser(User user) {
		Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
		if (existingUser.isPresent()) {
			throw new DuplicateUserException("User already exists.");
		}
		return userRepository.save(user);
	}

	public boolean validateCredentials(String email, String password) {
		User existingUser = getUserByEmail(email);
		String existingPassword = existingUser.getPassword();
		if (existingPassword.equals(password)) {
			return true;
		} else {
			throw new BadCredentialsException("Invalid email or password.");
		}
	}

	public User updateUser(String email, String newPassword) {
		User existingUser = getUserByEmail(email);
		existingUser.setPassword(newPassword);
		return userRepository.save(existingUser);
	}

	public void deleteUser(Long id) {
		User existingUser = getUserById(id);
		userRepository.delete(existingUser);
	}

	public String generateResetToken(String email) {
		User user = getUserByEmail(email);
		String resetToken = UUID.randomUUID().toString();
		user.setResetToken(resetToken);
		userRepository.save(user);
		return resetToken;
	}

	public void resetPassword(String email, String resetToken, String newPassword) {
		User user = getUserByEmail(email);
		if (user.getResetToken() == null || !user.getResetToken().equals(resetToken)) {
			throw new InvalidResetTokenException("invalid reset token");
		}
		user.setPassword(newPassword);
		user.setResetToken(null);
		userRepository.save(user);
	}
}