package com.krish.TaskMate.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.krish.TaskMate.Exceptions.DuplicateTodoException;
import com.krish.TaskMate.Exceptions.DuplicateUserException;
import com.krish.TaskMate.Exceptions.InvalidResetTokenException;
import com.krish.TaskMate.Exceptions.InvalidTodoException;
import com.krish.TaskMate.Exceptions.TodoNotFoundException;
import com.krish.TaskMate.Exceptions.UserNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();

		for (FieldError error : ex.getBindingResult().getFieldErrors()) {
			errors.put(error.getField(), error.getDefaultMessage());
		}

		for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
			errors.put(error.getObjectName(), error.getDefaultMessage());
		}

		ErrorResponse response = new ErrorResponse(errors);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(UserNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ResponseEntity<ErrorResponse> handleResourceNotFoundException(UserNotFoundException ex) {
		Map<String, String> errors = new HashMap<>();
		errors.put("Username", ex.getMessage());
		ErrorResponse response = new ErrorResponse(errors);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(DuplicateUserException.class)
	public ResponseEntity<ErrorResponse> handleDuplicateUserException(DuplicateUserException ex) {
		Map<String, String> errors = new HashMap<>();
		errors.put("User", ex.getMessage());
		ErrorResponse response = new ErrorResponse(errors);
		return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
		Map<String, String> errors = new HashMap<>();
		errors.put("User", ex.getMessage());
		ErrorResponse response = new ErrorResponse(errors);
		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(TodoNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleTodoNotFoundException(TodoNotFoundException ex) {
		Map<String, String> errors = new HashMap<>();
		errors.put("todo", ex.getMessage());
		ErrorResponse response = new ErrorResponse(errors);
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(DuplicateTodoException.class)
	public ResponseEntity<ErrorResponse> handleDuplicateTodoException(DuplicateTodoException ex) {
		Map<String, String> errors = new HashMap<>();
		errors.put("todo", ex.getMessage());
		ErrorResponse response = new ErrorResponse(errors);
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(InvalidTodoException.class)
	public ResponseEntity<ErrorResponse> handleInvalidTodoException(InvalidTodoException ex) {
		Map<String, String> errors = new HashMap<>();
		errors.put("todo", ex.getMessage());
		ErrorResponse response = new ErrorResponse(errors);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(InvalidResetTokenException.class)
	public ResponseEntity<ErrorResponse> handleInvalidResetTokenException(InvalidResetTokenException ex) {
		Map<String, String> errors = new HashMap<>();
		errors.put("token", ex.getMessage());
		ErrorResponse response = new ErrorResponse(errors);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
}
