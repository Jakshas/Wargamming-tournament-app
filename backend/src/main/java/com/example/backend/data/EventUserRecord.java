package com.example.backend.data;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class EventUserRecord implements Comparable<EventUserRecord> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private User user;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Event event;

    private int place;

    private int rounds;
    private int points;
    private int wins;
    private int loses;
    @Lob
    private String list;
    private int bonusPoints;
    private float Sos;

    @ManyToMany
    private Set<User> enemies;

    public int getPlace() {
        return this.place;
    }

    public void setPlace(int place) {
        this.place = place;
    }

    public Set<User> getEnemies() {
        return this.enemies;
    }

    public void setEnemies(Set<User> enemies) {
        this.enemies = enemies;
    }

    public float getSos() {
        return this.Sos;
    }

    public void setSos(float Sos) {
        this.Sos = Sos;
    }

    public int getBonusPoints() {
        return this.bonusPoints;
    }

    public void setBonusPoints(int bonusPoints) {
        this.bonusPoints = bonusPoints;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return this.event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public int getRounds() {
        return this.rounds;
    }

    public void setRounds(int rounds) {
        this.rounds = rounds;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getWins() {
        return this.wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getLoses() {
        return this.loses;
    }

    public void setLoses(int loses) {
        this.loses = loses;
    }

    public String getList() {
        return this.list;
    }

    public void setList(String list) {
        this.list = list;
    }

    @Override
    public int compareTo(EventUserRecord arg0) {
        if (this.points + this.bonusPoints == arg0.points + arg0.bonusPoints) {
            if (this.Sos > arg0.Sos) {
                return -1;
            } else {
                return 1;
            }
        }
        if (this.points + this.bonusPoints > arg0.points + arg0.bonusPoints) {
            return -1;
        } else {
            return 1;
        }
    }

}
