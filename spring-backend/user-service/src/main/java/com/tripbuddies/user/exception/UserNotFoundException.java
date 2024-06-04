package com.tripbuddies.user.exception;

public class UserNotFoundException extends RuntimeException {
    private final String id;

    public UserNotFoundException(String id) {
        super("Could not find User with id " + id);
        this.id = id;
    }

}
