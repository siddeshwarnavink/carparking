package com.sidapps.carparking.shared;

public class ErrorMessageResponse {
	protected ResponseType responseType = ResponseType.ERROR;
	protected String errorMessage;

	public ErrorMessageResponse() {
	}

	public ErrorMessageResponse(String message) {
		this.errorMessage = message;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public ResponseType getResponseType() {
		return responseType;
	}

	public void setResponseType(ResponseType responseType) {
		this.responseType = responseType;
	}
}
