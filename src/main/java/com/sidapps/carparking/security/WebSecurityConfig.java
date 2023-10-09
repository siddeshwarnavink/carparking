package com.sidapps.carparking.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import com.sidapps.carparking.users.UserSessionRepository;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	@Autowired
	private final UserSessionRepository userSessionRepository;

	public WebSecurityConfig(UserSessionRepository userSessionRepository) {
		this.userSessionRepository = userSessionRepository;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(
					authorize -> authorize
						.requestMatchers("/auth/logout").authenticated()
						.requestMatchers("/auth/**").permitAll()
						.anyRequest().authenticated()
				)
				.addFilterBefore(new AuthenticationTokenFilter(userSessionRepository),
						UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}