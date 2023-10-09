package com.sidapps.carparking.auth;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public class CreateAccountRequest {
	@NotEmpty(message = "Name is required")
	private String name;

	@NotEmpty(message = "Email is required")
	@Pattern(regexp=".+@.+\\..+", message="Invalid email")
	private String email;

	@NotEmpty(message = "Password is required")
	private String password;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

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
