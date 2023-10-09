package com.sidapps.carparking.auth;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import com.sidapps.carparking.users.User;

public class UserAuthentication extends AbstractAuthenticationToken {

    private static final long serialVersionUID = -6944774346553169351L;
	private final User user;

    public UserAuthentication(User user) {
        super(user.getAuthorities());
        this.user = user;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return user;
    }
    
    public User getUser() {
        return user;
    }
}