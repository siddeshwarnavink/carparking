package com.sidapps.carparking.slotbooking;

import java.time.LocalDateTime;

import org.hibernate.annotations.GenericGenerator;

import com.sidapps.carparking.users.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class SlotBooking {
	@Id
	@GeneratedValue(generator = "shortUUID")
	@GenericGenerator(name = "shortUUID", strategy = "com.sidapps.carparking.shared.ShortUUIDGenerator")
	@Column(unique = true)
	private String bookingId;


	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "booked_at")
	private LocalDateTime bookedAt;

	@Column(name = "booked_date")
	@NotNull(message = "Booking date required")
	private LocalDateTime bookingDate;

	@ManyToOne
	@JoinColumn(name = "slot_id")
	@NotNull(message = "Slot is required")
	private ParkingSlot slot;

	@Column(name = "checkin_at")
	private LocalDateTime checkinAt;

	@ManyToOne
	@JoinColumn(name = "checkin_staff_id")
	private User checkinStaff;

	@Column(name = "checkout_at")
	private LocalDateTime checkoutAt;

	@ManyToOne
	@JoinColumn(name = "checkout_staff_id")
	private User checkoutStaff;

	public String getBookingId() {
		return bookingId;
	}

	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LocalDateTime getBookedAt() {
		return bookedAt;
	}

	public void setBookedAt(LocalDateTime bookedAt) {
		this.bookedAt = bookedAt;
	}

	public LocalDateTime getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDateTime bookingDate) {
		this.bookingDate = bookingDate;
	}

	public ParkingSlot getSlot() {
		return slot;
	}

	public void setSlot(ParkingSlot slot) {
		this.slot = slot;
	}

	public LocalDateTime getCheckinAt() {
		return checkinAt;
	}

	public void setCheckinAt(LocalDateTime checkinAt) {
		this.checkinAt = checkinAt;
	}

	public User getCheckinStaff() {
		return checkinStaff;
	}

	public void setCheckinStaff(User checkinStaff) {
		this.checkinStaff = checkinStaff;
	}

	public LocalDateTime getCheckoutAt() {
		return checkoutAt;
	}

	public void setCheckoutAt(LocalDateTime checkoutAt) {
		this.checkoutAt = checkoutAt;
	}

	public User getCheckoutStaff() {
		return checkoutStaff;
	}

	public void setCheckoutStaff(User checkoutStaff) {
		this.checkoutStaff = checkoutStaff;
	}
}
