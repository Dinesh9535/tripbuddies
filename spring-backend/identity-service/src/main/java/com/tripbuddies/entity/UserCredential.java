package com.tripbuddies.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_credentials")
public class UserCredential {

    @Id
    private String id;
    private String displayName;
    private String email;
    private String password;
    private Boolean emailVerified;
}
