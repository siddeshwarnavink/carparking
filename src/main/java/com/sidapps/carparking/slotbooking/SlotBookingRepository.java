package com.sidapps.carparking.slotbooking;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SlotBookingRepository extends JpaRepository<SlotBooking, String> {
    List<SlotBooking> findByBookingDateAndSlot(LocalDateTime bookingDate, ParkingSlot slot);
}