package com.sidapps.carparking.slotbooking;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sidapps.carparking.auth.AuthFailedResponse;
import com.sidapps.carparking.auth.AuthService;
import com.sidapps.carparking.auth.UserRole;
import com.sidapps.carparking.shared.ErrorMessageResponse;
import com.sidapps.carparking.users.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/booking")
public class SlotBookingController {
	@Autowired
	private AuthService authService;

	@Autowired
	private BookingService bookingService;

	@Autowired
	private ParkingSlotRepository parkingSlotRepository;

	@Autowired
	private SlotBookingRepository slotBookingRepository;

	@GetMapping(path = "/userBooking")
	public ResponseEntity<?> getUserBooking() {
		User user = authService.getAuthenticatedUser();
		if (user != null) {
			LocalDate today = LocalDate.now();
			LocalDateTime startOfDay = today.atStartOfDay();
			Pageable pageable = PageRequest.of(0, 1, Sort.by("bookingDate").descending());
			List<SlotBooking> userBookings = this.slotBookingRepository.findByUserId(user.getId(), startOfDay,
					pageable);

			if (userBookings.isEmpty()) {
				BookingSuccessResponse response = new BookingSuccessResponse();
				response.setMessage("No bookings found");
				return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
			}

			SlotBooking userBooking = userBookings.get(0);

			BookedSlotDTO bookedSlotDTO = new BookedSlotDTO(userBooking.getSlot().getName(),
					userBooking.getSlot().getLocation());
			BookingDTO bookingDTO = new BookingDTO(userBooking.getBookingId(), bookedSlotDTO);
			if(userBooking.getCheckinAt() != null) {
				bookingDTO.setPending(false);
			}
			BookingSuccessResponse response = new BookingSuccessResponse(bookingDTO);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping(path = "/checkAvailability")
	public ResponseEntity<?> checkSlotAvailability(@Valid @RequestBody SlotBookingRequest request) {
		try {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
			LocalDate bookingDate = LocalDate.parse(request.getDate(), formatter);

			LocalDateTime bookingDateTime = bookingDate.atStartOfDay();
			boolean isAvailable = bookingService.checkSlotAvailability(request.getVehicleType(), bookingDateTime);

			CheckSlotAvailabilityResponse response = new CheckSlotAvailabilityResponse(isAvailable);
			if (isAvailable) {
				response.setMessage("Slot available");
			} else {
				response.setMessage("No slot available");
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (DateTimeParseException e) {
			ErrorMessageResponse response = new ErrorMessageResponse("Invalid booking date");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping(path = "/bookSlot")
	public ResponseEntity<?> bookSlot(@Valid @RequestBody SlotBookingRequest request) {
		User user = authService.getAuthenticatedUser();
		if (user != null) {
			if (user.getRole() != UserRole.Customer) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}

			try {
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
				LocalDate bookingDate = LocalDate.parse(request.getDate(), formatter);

				if (bookingDate.isBefore(LocalDate.now())) {
					ErrorMessageResponse response = new ErrorMessageResponse("Booking date cannot be in the past");
					return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
				}

				LocalDateTime startOfDay = bookingDate.atStartOfDay();
				LocalDateTime endOfDay = bookingDate.atTime(23, 59, 59);
				List<SlotBooking> existingBookings = slotBookingRepository.findByUserAndBookingDateBetween(user,
						startOfDay, endOfDay);

				if (!existingBookings.isEmpty()) {
					ErrorMessageResponse response = new ErrorMessageResponse(
							"You already have a booking on this date.");
					return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
				}

				LocalDateTime bookingDateTime = bookingDate.atStartOfDay();

				boolean isAvailable = bookingService.checkSlotAvailability(request.getVehicleType(), bookingDateTime);
				if (isAvailable) {
					Optional<ParkingSlot> allocatedSlotOptional = allocateParkingSlot(request.getVehicleType(),
							bookingDateTime);

					if (allocatedSlotOptional.isPresent()) {
						ParkingSlot allocatedSlot = allocatedSlotOptional.get();

						SlotBooking newBooking = new SlotBooking();
						newBooking.setBookedAt(LocalDateTime.now());
						newBooking.setBookingDate(bookingDateTime);
						newBooking.setUser(user);
						newBooking.setSlot(allocatedSlot);

						bookingService.saveBooking(newBooking);

						BookedSlotDTO bookedSlot = new BookedSlotDTO(allocatedSlot.getName(),
								allocatedSlot.getLocation());
						BookingDTO bookingDTO = new BookingDTO(newBooking.getBookingId(), bookedSlot);
						BookingSuccessResponse response = new BookingSuccessResponse(bookingDTO);
						response.setMessage("Slot booking success");
						return new ResponseEntity<>(response, HttpStatus.CREATED);
					} else {
						ErrorMessageResponse response = new ErrorMessageResponse("No slots available");
						return new ResponseEntity<>(response, HttpStatus.OK);
					}
				} else {
					ErrorMessageResponse response = new ErrorMessageResponse("No slots available");
					return new ResponseEntity<>(response, HttpStatus.OK);
				}
			} catch (DateTimeParseException e) {
				ErrorMessageResponse response = new ErrorMessageResponse("Invalid booking date");
				return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

	}

	private Optional<ParkingSlot> allocateParkingSlot(VehicleType vehicleType, LocalDateTime bookingDateTime) {
		List<ParkingSlot> availableSlots = parkingSlotRepository.findByVehicleType(vehicleType);

		for (ParkingSlot slot : availableSlots) {
			boolean isBooked = bookingService.isSlotBookedOnDate(slot.getId(), bookingDateTime);

			if (!isBooked) {
				return Optional.of(slot);
			}
		}
		return Optional.empty();
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<AuthFailedResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();

		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});

		AuthFailedResponse response = new AuthFailedResponse();
		response.setErrorMessage("Validation failed!");
		response.setErrors(errors);

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

}
