package com.krish.TaskMate.Exceptions;

public class DuplicateTodoException extends RuntimeException {
	public DuplicateTodoException(String message) {
		super(message);
	}
}
