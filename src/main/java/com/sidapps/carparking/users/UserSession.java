package com.sidapps.carparking.users;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UserSession {
	@Id
	private String token = UUID.randomUUID().toString();

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public String getToken() {
		return token;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
