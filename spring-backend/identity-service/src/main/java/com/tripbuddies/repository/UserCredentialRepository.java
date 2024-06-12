package com.tripbuddies.repository;

import com.tripbuddies.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCredentialRepository  extends JpaRepository<UserCredential,Integer> {
    Optional<UserCredential> findByDisplayName(String displayname);
    Optional<UserCredential> findByEmailAndPassword(String email, String password);
}
