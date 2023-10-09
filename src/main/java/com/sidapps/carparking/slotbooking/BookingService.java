package com.sidapps.carparking.slotbooking;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

	@Autowired
	private ParkingSlotRepository parkingSlotRepository;

	@Autowired
	private SlotBookingRepository slotBookingRepository;

	public boolean checkSlotAvailability(VehicleType vehicleType, LocalDateTime bookingDate) {
		List<ParkingSlot> availableSlots = parkingSlotRepository.findByVehicleType(vehicleType);
		for (ParkingSlot slot : availableSlots) {
			List<SlotBooking> bookedSlots = slotBookingRepository.findByBookingDateAndSlot(bookingDate, slot);
			if (bookedSlots.isEmpty()) {
				return true;
			}
		}
		return false;
	}
}
