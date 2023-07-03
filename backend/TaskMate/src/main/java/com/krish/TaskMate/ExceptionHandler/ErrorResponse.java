package com.krish.TaskMate.ExceptionHandler;

import java.util.Map;

public class ErrorResponse {
	private Map<String, String> errors;

	public ErrorResponse(Map<String, String> errors) {
		this.errors = errors;
	}

	public Map<String, String> getErrors() {
		return errors;
	}

	public void setErrors(Map<String, String> errors) {
		this.errors = errors;
	}
}
