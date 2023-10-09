package com.sidapps.carparking.shared;

import java.io.Serializable;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Objects;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;


import jakarta.persistence.NoResultException;

public class ShortUUIDGenerator implements IdentifierGenerator {
	private static final long serialVersionUID = -4599495376886075605L;
	private final SecureRandom random = new SecureRandom();

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		String newId;
		do {
			newId = generateId();
		} while (exists(session, newId));
		return newId;
	}

	private String generateId() {
		return new BigInteger(30, random).toString(32).toUpperCase();
	}

	private boolean exists(SharedSessionContractImplementor session, String id) {
		String hql = "SELECT 1 FROM SlotBooking sb WHERE sb.bookingId = :id";
		try {
			Long exists = (Long) session.createQuery(hql, Long.class).setParameter("id", id).getSingleResult();
			return Objects.nonNull(exists);
		} catch (NoResultException e) {
			return false;
		}
	}

}