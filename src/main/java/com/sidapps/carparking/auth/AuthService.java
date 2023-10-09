package com.sidapps.carparking.auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.sidapps.carparking.users.User;
import com.sidapps.carparking.users.UserSession;
import com.sidapps.carparking.users.UserSessionRepository;

@Service
public class AuthService {
	@Autowired
	private UserSessionRepository userSessionRepository;

	public User getAuthenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication instanceof UserAuthentication) {
			return ((UserAuthentication) authentication).getUser();
		}
		return null;
	}

	public void logout(User user) {
		Optional<UserSession> userSessionOptional = userSessionRepository.findByUser(user);
		userSessionOptional.ifPresent(userSessionRepository::delete);
		SecurityContextHolder.clearContext();
	}
}
