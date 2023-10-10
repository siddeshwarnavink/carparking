package com.sidapps.carparking.bookingcheckin;

import jakarta.validation.constraints.NotEmpty;

public class BookingCheckinRequest {
	@NotEmpty(message = "Booking code is required")
	private String bookingCode;

	public String getBookingCode() {
		return bookingCode;
	}

	public void setBookingCode(String bookingCode) {
		this.bookingCode = bookingCode;
	}
}
