package com.sidapps.carparking.slotbooking;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class SlotBookingRequest {
	@NotNull(message = "Vehicle type is required")
	private VehicleType vehicleType;

	@NotEmpty(message = "Booking date is required")
	private String date;

	public VehicleType getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(VehicleType vehicleType) {
		this.vehicleType = vehicleType;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
}
