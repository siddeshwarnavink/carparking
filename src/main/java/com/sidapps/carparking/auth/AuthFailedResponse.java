package com.sidapps.carparking.auth;

import java.util.Map;

import com.sidapps.carparking.shared.ErrorMessageResponse;

public class AuthFailedResponse extends ErrorMessageResponse {
	private Map<String, String> errors;

	public AuthFailedResponse() {
	}

	public AuthFailedResponse(String message) {
		super(message);
	}

	public AuthFailedResponse(String message, Map<String, String> errors) {
		super(message);
		this.errors = errors;
	}

	public Map<String, String> getErrors() {
		return errors;
	}

	public void setErrors(Map<String, String> errors) {
		this.errors = errors;
	}
}
