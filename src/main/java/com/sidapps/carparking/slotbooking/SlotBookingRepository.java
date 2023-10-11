package com.sidapps.carparking.slotbooking;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sidapps.carparking.users.User;

public interface SlotBookingRepository extends JpaRepository<SlotBooking, String> {
	List<SlotBooking> findByBookingDateAndSlot(LocalDateTime bookingDate, ParkingSlot slot);

	@Query("SELECT sb FROM SlotBooking sb WHERE sb.slot.id = :slotId AND sb.bookingDate = :bookingDate")
	List<SlotBooking> findBySlotIdAndBookingDate(@Param("slotId") Integer slotId,
			@Param("bookingDate") LocalDateTime bookingDate);

	List<SlotBooking> findByUserAndBookingDateBetween(User user, LocalDateTime startDateTime,
			LocalDateTime endDateTime);
	
	@Query("SELECT sb FROM SlotBooking sb WHERE sb.user.id = :userId AND sb.checkinAt = NULL AND sb.bookingDate > CURRENT_TIMESTAMP")
    List<SlotBooking> findByUserId(@Param("userId") Integer userId, Pageable pageable);
}
