package com.example.backend.data;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

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

  @ManyToMany
  private Set<Event> events;
  @OneToMany(mappedBy = "user")
  private Set<EventUserRecord> eventUserRecords;

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

  public void setEvents(Set<Event> events) {
    this.events = events;
  }

  public Set<Event> getEvents() {
    return events;
  }
}