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
import jakarta.validation.constraints.NotEmpty;

@Entity
public class SlotBooking {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(length = 6, unique = true)
	private String bookingId;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "booked_at")
	private LocalDateTime bookedAt;

	@ManyToOne
	@JoinColumn(name = "slot_id")
	@NotEmpty(message = "Slot is required")
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
}
