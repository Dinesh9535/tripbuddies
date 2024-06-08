package com.tripbuddies.model;

import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name ="accounts")
public class Account implements Serializable {
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
