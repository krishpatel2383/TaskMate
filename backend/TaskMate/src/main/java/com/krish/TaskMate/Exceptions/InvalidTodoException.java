package com.krish.TaskMate.Exceptions;

public class InvalidTodoException extends RuntimeException {
	public InvalidTodoException(String message) {
		super(message);
	}
}
