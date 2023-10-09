package com.sidapps.carparking.slotbooking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Integer> {
    List<ParkingSlot> findByVehicleType(VehicleType vehicleType);
}
