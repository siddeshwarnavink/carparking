package com.sidapps.carparking.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sidapps.carparking.auth.UserAuthentication;
import com.sidapps.carparking.shared.ErrorMessageResponse;
import com.sidapps.carparking.users.User;
import com.sidapps.carparking.users.UserSession;
import com.sidapps.carparking.users.UserSessionRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationTokenFilter extends OncePerRequestFilter {
	private final UserSessionRepository userSessionRepository;

	public AuthenticationTokenFilter(UserSessionRepository userSessionRepository) {
		this.userSessionRepository = userSessionRepository;
	}

	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		final String authorizationHeader = request.getHeader("Authorization");
		String requestURI = request.getRequestURI();
		ErrorMessageResponse errorResponse = new ErrorMessageResponse("User session invalid.");

		if (requestURI.startsWith("/auth/") && !"/auth/logout".equals(requestURI)) {
			filterChain.doFilter(request, response);
			return;
		}

		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			String token = authorizationHeader.substring(7);
			Optional<UserSession> userSessionOptional = userSessionRepository.findByToken(token);

			if (userSessionOptional.isPresent()) {
				User user = userSessionOptional.get().getUser();
				SecurityContextHolder.getContext().setAuthentication(new UserAuthentication(user));
			} else {
				sendErrorResponse(response, errorResponse);
				return;
			}
		} else {
			sendErrorResponse(response, errorResponse);
			return;
		}

		filterChain.doFilter(request, response);
	}

	private void sendErrorResponse(HttpServletResponse response, ErrorMessageResponse errorResponse)
			throws IOException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json");
		String jsonResponse = new ObjectMapper().writeValueAsString(errorResponse);
		response.getWriter().write(jsonResponse);
	}
}
