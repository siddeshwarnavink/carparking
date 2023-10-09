package com.sidapps.carparking.auth;

import com.sidapps.carparking.shared.SuccessMessageResponse;
import com.sidapps.carparking.users.User;

public class AuthSuccessResponse extends SuccessMessageResponse {
	private User user;
	private String token;
	

	public AuthSuccessResponse() {
	}

	public AuthSuccessResponse(String message) {
		super(message);
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public void setUser(User user) {
		this.user = user;
		this.user.setPassword(null);
	}
}
