package com.sidapps.carparking.slotbooking;

public class BookingDTO {
	private String bookingCode;
	private BookedSlotDAO bookedSlot;
	
	public BookingDTO(String bookingCode, BookedSlotDAO bookedSlot) {
		this.setBookedSlot(bookedSlot);
		this.setBookingCode(bookingCode);
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
