package com.sidapps.carparking.auth;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sidapps.carparking.shared.ErrorMessageResponse;
import com.sidapps.carparking.shared.SuccessMessageResponse;
import com.sidapps.carparking.users.User;
import com.sidapps.carparking.users.UserRepository;
import com.sidapps.carparking.users.UserSession;
import com.sidapps.carparking.users.UserSessionRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserSessionRepository userSessionRepository;
	@Autowired
	private AuthService authService;

	@PostMapping(path = "/createAccount")
	public ResponseEntity<?> createAccount(@Valid @RequestBody CreateAccountRequest createAccountRequest)
			throws NoSuchAlgorithmException {
		Optional<User> createUser = userRepository.findByEmail(createAccountRequest.getEmail());

		if (createUser.isPresent()) {
			AuthFailedResponse response = new AuthFailedResponse();
			response.setErrorMessage("Email is already in use.");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		User user = new User();
		user.setName(createAccountRequest.getName());
		user.setEmail(createAccountRequest.getEmail());
		user.setPassword(createAccountRequest.getPassword());

		MessageDigest digest = MessageDigest.getInstance("SHA-256");
		byte[] hash = digest.digest(user.getPassword().getBytes(StandardCharsets.UTF_8));
		user.setPassword(Base64.getEncoder().encodeToString(hash));

		userRepository.save(user);

		AuthSuccessResponse response = new AuthSuccessResponse();
		response.setMessage("User account created.");
		response.setUser(user);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@PostMapping(path = "/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) throws NoSuchAlgorithmException {

		Optional<User> loginUser = userRepository.findByEmail(loginRequest.getEmail());
		if (loginUser.isPresent()) {
			User user = loginUser.get();
			String hashedPassword = Base64.getEncoder().encodeToString(MessageDigest.getInstance("SHA-256")
					.digest(loginRequest.getPassword().getBytes(StandardCharsets.UTF_8)));

			if (hashedPassword.equals(user.getPassword())) {
				UserSession userSession = new UserSession();
				userSession.setUser(user);

				userSessionRepository.save(userSession);

				AuthSuccessResponse response = new AuthSuccessResponse();
				response.setMessage("User session created");
				response.setToken(userSession.getToken());
				response.setUser(user);

				return new ResponseEntity<>(response, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new AuthFailedResponse("Invalid credentials!"), HttpStatus.UNAUTHORIZED);
			}
		} else {
			return new ResponseEntity<>(new AuthFailedResponse("Invalid credentials!"), HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping(path = "/logout")
	public ResponseEntity<?> logout() {
		User user = authService.getAuthenticatedUser();
		if (user != null) {
			authService.logout(user);

			SuccessMessageResponse response = new SuccessMessageResponse("User session ended.");
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ErrorMessageResponse response = new ErrorMessageResponse("Invalid user session.");
			return new ResponseEntity<>(response,HttpStatus.UNAUTHORIZED);
		}
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<AuthFailedResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();

		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});

		AuthFailedResponse response = new AuthFailedResponse();
		response.setErrorMessage("Auth validation failed!");
		response.setErrors(errors);

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
}
