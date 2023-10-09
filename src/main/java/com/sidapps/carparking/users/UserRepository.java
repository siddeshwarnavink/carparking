package com.sidapps.carparking.users;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	boolean existsByEmail(String email);
	
	 Optional<User> findByEmail(String email);
}
