package com.sidapps.carparking.bookingcheckin;

import com.sidapps.carparking.shared.SuccessMessageResponse;
import com.sidapps.carparking.slotbooking.BookingDTO;

public class BookingCheckinResponse extends SuccessMessageResponse {
	private BookingDTO booking;

	public BookingCheckinResponse(String message) {
		super(message);
	}
	
	public BookingDTO getBooking() {
		return booking;
	}

	public void setBooking(BookingDTO booking) {
		this.booking = booking;
	}
}
