package com.tripbuddies.exception;

public class AccountNotFoundException extends RuntimeException {
    private final String id;

    public AccountNotFoundException(String id) {
        super("Could not find User with id " + id);
        this.id = id;
    }

}
