package com.sidapps.carparking.shared;

public class SuccessMessageResponse {
	protected ResponseType responseType = ResponseType.OK;
	protected String message;

	public SuccessMessageResponse() {
	}

	public SuccessMessageResponse(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ResponseType getResponseType() {
		return responseType;
	}

	public void setResponseType(ResponseType responseType) {
		this.responseType = responseType;
	}
}
