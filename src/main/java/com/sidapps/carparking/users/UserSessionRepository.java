package com.sidapps.carparking.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSessionRepository extends JpaRepository<UserSession, String> {
	 Optional<UserSession> findByToken(String token);
	 Optional<UserSession> findByUser(User user);
}
