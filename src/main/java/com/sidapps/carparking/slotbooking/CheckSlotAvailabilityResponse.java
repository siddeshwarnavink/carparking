package com.sidapps.carparking.slotbooking;

import com.sidapps.carparking.shared.SuccessMessageResponse;

public class CheckSlotAvailabilityResponse extends SuccessMessageResponse {
	private boolean available;
	
	public CheckSlotAvailabilityResponse(boolean available) {
		this.setAvailable(available);
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}
}
