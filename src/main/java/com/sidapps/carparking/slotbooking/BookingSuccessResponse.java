package com.sidapps.carparking.slotbooking;

import com.sidapps.carparking.shared.SuccessMessageResponse;

public class BookingSuccessResponse extends SuccessMessageResponse {
	private String bookingCode;
	private BookedSlotDAO bookedSlot;

	public BookingSuccessResponse(SlotBooking booking) {
		this.setBookingCode(booking.getBookingId());
		this.setMessage("Slot booking success");
	}

	public String getBookingCode() {
		return bookingCode;
	}

	public void setBookingCode(String bookingCode) {
		this.bookingCode = bookingCode;
	}

	public BookedSlotDAO getBookedSlot() {
		return bookedSlot;
	}

	public void setBookedSlot(BookedSlotDAO bookedSlot) {
		this.bookedSlot = bookedSlot;
	}
}
