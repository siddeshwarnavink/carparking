package com.sidapps.carparking.users;

import com.sidapps.carparking.shared.ResponseType;

public class UserSuccessResponse {
	private ResponseType responseType = ResponseType.OK;
	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
		this.user.setPassword(null);
	}

	public ResponseType getResponseType() {
		return responseType;
	}

	public void setResponseType(ResponseType responseType) {
		this.responseType = responseType;
	}	
}
