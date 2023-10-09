package com.sidapps.carparking.slotbooking;

public class BookedSlotDAO {
	private String location;
	private String spot;

	public BookedSlotDAO() {

	}

	public BookedSlotDAO(String location, String spot) {
		this.setLocation(location);
		this.setSpot(spot);
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSpot() {
		return spot;
	}

	public void setSpot(String spot) {
		this.spot = spot;
	}
}
