package com.example.backend.data;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.springframework.security.core.GrantedAuthority;

@Entity // This tells Hibernate to make a table out of this class
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  private String name;

  private String email;

  private String password;

  @OneToMany(mappedBy = "organizer")
  private Set<Event> organizing;

  @OneToMany(mappedBy = "user")
  private Set<EventUserRecord> eventUserRecords;

  @Enumerated(EnumType.STRING)
  private Role role;

  @ManyToMany
  private Set<EventUserRecord> enemies;

  public Set<EventUserRecord> getEventUserRecords() {
    return this.eventUserRecords;
  }

  public void setEventUserRecords(Set<EventUserRecord> eventUserRecords) {
    this.eventUserRecords = eventUserRecords;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPassword() {
    return password;
  }

  public void setOrganizing(Set<Event> organizing) {
    this.organizing = organizing;
  }

  public Set<Event> getOrganizing() {
    return organizing;
  }

  public enum Role implements GrantedAuthority {
    NORMAL,
    BAD;

    @Override
    public String getAuthority() {
      return "ROLE_" + this.name();
    }
  }
}