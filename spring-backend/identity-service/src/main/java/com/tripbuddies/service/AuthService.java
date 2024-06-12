package com.tripbuddies.service;

import com.tripbuddies.entity.UserCredential;
import com.tripbuddies.repository.UserCredentialRepository;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserCredentialRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Transactional
    public String saveUser(String token) {

        try {
            UserCredential credential = new UserCredential();
            Map<String, Object> payloadJson = jwtService.decodeJWT(token);
            credential.setDisplayName((String) payloadJson.get("name"));
            credential.setPassword(passwordEncoder.encode((String) payloadJson.get("user_id")));
            credential.setId((String) payloadJson.get("user_id"));
            credential.setEmail((String) payloadJson.get("email"));
            credential.setEmailVerified((Boolean) payloadJson.get("email_verified"));
            repository.saveAndFlush(credential);
            return "user added to the system";
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public String generateToken(String username) {
        return jwtService.generateToken(username);
    }

    public boolean validateToken(String token) {
        try {
            Map<String, Object> payloadJson = jwtService.decodeJWT(token);
            var userEmail = passwordEncoder.encode((String) payloadJson.get("email"));
            var userPassword = passwordEncoder.encode((String) payloadJson.get("user_id"));
            Optional<UserCredential> user = repository.findByEmailAndPassword(userEmail, userPassword);
            return user.isPresent() && user.get().getEmailVerified();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Map<String, Object> decodeToken(String token) throws IOException {
       return  jwtService.decodeJWT(token);
    }


}
