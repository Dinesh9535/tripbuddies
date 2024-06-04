package com.tripbuddies.user.model;

import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name ="users")
public class User implements Serializable {
  @Id @GeneratedValue(generator="system-uuid")
  @GenericGenerator(name="system-uuid", strategy = "uuid")
  private String id;
  @Column
  private String name;
  @Column
  private String emailId;
  @Column
  private String fullName;
}
