package com.sidapps.carparking.slotbooking;

import com.sidapps.carparking.shared.SuccessMessageResponse;

public class BookingSuccessResponse extends SuccessMessageResponse {
	private BookingDTO booking;

	public BookingSuccessResponse(BookingDTO booking) {
		this.setBooking(booking);
	}

	public BookingDTO getBooking() {
		return booking;
	}

	public void setBooking(BookingDTO booking) {
		this.booking = booking;
	}
}
