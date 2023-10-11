package com.sidapps.carparking.slotbooking;

public class BookingDTO {
	private String bookingCode;
	private BookedSlotDTO bookedSlot;
	private boolean pending = true;
	
	public BookingDTO(String bookingCode, BookedSlotDTO bookedSlot) {
		this.setBookedSlot(bookedSlot);
		this.setBookingCode(bookingCode);
	}

	public String getBookingCode() {
		return bookingCode;
	}

	public void setBookingCode(String bookingCode) {
		this.bookingCode = bookingCode;
	}

	public BookedSlotDTO getBookedSlot() {
		return bookedSlot;
	}

	public void setBookedSlot(BookedSlotDTO bookedSlot) {
		this.bookedSlot = bookedSlot;
	}

	public boolean isPending() {
		return pending;
	}

	public void setPending(boolean pending) {
		this.pending = pending;
	}
}
