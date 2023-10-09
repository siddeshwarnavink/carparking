package com.sidapps.carparking.users;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sidapps.carparking.auth.AuthService;

@RestController
@RequestMapping(path = "/users")
public class UserController {
	@Autowired
	private AuthService authService;

	@GetMapping(path = "/profile")
	public ResponseEntity<?> profile() {
		User user = authService.getAuthenticatedUser();
		if (user != null) {
			UserSuccessResponse response = new UserSuccessResponse();
			response.setUser(user);
			return ResponseEntity.ok(response);
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
}
