package com.sidapps.carparking.bookingcheckin;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sidapps.carparking.auth.AuthService;
import com.sidapps.carparking.auth.UserRole;
import com.sidapps.carparking.shared.ErrorMessageResponse;
import com.sidapps.carparking.shared.SuccessMessageResponse;
import com.sidapps.carparking.slotbooking.BookedSlotDTO;
import com.sidapps.carparking.slotbooking.BookingDTO;
import com.sidapps.carparking.slotbooking.SlotBooking;
import com.sidapps.carparking.slotbooking.SlotBookingRepository;
import com.sidapps.carparking.users.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/booking/checkin")
public class BookingCheckinController {
	@Autowired
	private AuthService authService;

	@Autowired
	private SlotBookingRepository slotBookingRepository;

	@PatchMapping(path = "/checkinBooking")
	public ResponseEntity<?> checkinBooking(@Valid @RequestBody BookingCheckinRequest request) {
		User user = authService.getAuthenticatedUser();
		if (user != null) {
			if (user.getRole() != UserRole.CheckinStaff) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}

			Optional<SlotBooking> booking = this.slotBookingRepository.findById(request.getBookingCode());

			if (booking.isPresent()) {
				SlotBooking currentBooking = booking.get();

				currentBooking.setCheckinAt(LocalDateTime.now());
				currentBooking.setCheckinStaff(user);
				slotBookingRepository.save(currentBooking);

				BookingCheckinResponse response = new BookingCheckinResponse("Booking checked in");
				BookedSlotDTO bookedSlotDTO = new BookedSlotDTO(currentBooking.getSlot().getLocation(), currentBooking.getSlot().getName());
				BookingDTO bookingDTO = new BookingDTO(currentBooking.getBookingId(), bookedSlotDTO);
				bookingDTO.setPending(false);
				response.setBooking(bookingDTO);
				return new ResponseEntity<>(response, HttpStatus.OK);
			} else {
				ErrorMessageResponse response = new ErrorMessageResponse("Booking not found");
				return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
			}

		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	@PatchMapping(path = "/checkoutBooking")
	public ResponseEntity<?> checkoutBooking(@Valid @RequestBody BookingCheckinRequest request) {
		System.out.println("Hit");
		User user = authService.getAuthenticatedUser();
		if (user != null) {
			System.out.println("User yes");

			Optional<SlotBooking> booking = this.slotBookingRepository.findById(request.getBookingCode());

			if (booking.isPresent()) {
				SlotBooking currentBooking = booking.get();

				currentBooking.setCheckoutAt(LocalDateTime.now());
				currentBooking.setCheckoutStaff(user);
				slotBookingRepository.save(currentBooking);

				SuccessMessageResponse response = new SuccessMessageResponse("Booking checked out");
				return new ResponseEntity<>(response, HttpStatus.OK);
			} else {
				ErrorMessageResponse response = new ErrorMessageResponse("Booking not found");
				return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
			}

		} else {

			System.out.println("User no");
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}

}
