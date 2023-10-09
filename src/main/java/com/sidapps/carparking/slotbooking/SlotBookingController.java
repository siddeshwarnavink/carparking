package com.sidapps.carparking.slotbooking;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sidapps.carparking.auth.AuthFailedResponse;
import com.sidapps.carparking.shared.ErrorMessageResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/booking")
public class SlotBookingController {
	@Autowired
	private BookingService bookingService;

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
