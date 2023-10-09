package com.sidapps.carparking.auth;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public class LoginRequest {
	@NotEmpty(message = "Email is required")
	@Pattern(regexp=".+@.+\\..+", message="Invalid email")
	private String email;

	@NotEmpty(message = "Password is required")
	private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
