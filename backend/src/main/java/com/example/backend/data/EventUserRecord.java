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

/**
 * Class describing user scors in tournament
 **/
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

    /**
     * @return int
     */
    public int getPlace() {
        return this.place;
    }

    /**
     * @param place
     */
    public void setPlace(int place) {
        this.place = place;
    }

    /**
     * @return Set<User>
     */
    public Set<User> getEnemies() {
        return this.enemies;
    }

    /**
     * @param enemies
     */
    public void setEnemies(Set<User> enemies) {
        this.enemies = enemies;
    }

    /**
     * @return float
     */
    public float getSos() {
        return this.Sos;
    }

    /**
     * @param Sos
     */
    public void setSos(float Sos) {
        this.Sos = Sos;
    }

    /**
     * @return int
     */
    public int getBonusPoints() {
        return this.bonusPoints;
    }

    /**
     * @param bonusPoints
     */
    public void setBonusPoints(int bonusPoints) {
        this.bonusPoints = bonusPoints;
    }

    /**
     * @return int
     */
    public int getId() {
        return this.id;
    }

    /**
     * @param id
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return User
     */
    public User getUser() {
        return this.user;
    }

    /**
     * @param user
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * @return Event
     */
    public Event getEvent() {
        return this.event;
    }

    /**
     * @param event
     */
    public void setEvent(Event event) {
        this.event = event;
    }

    /**
     * @return int
     */
    public int getRounds() {
        return this.rounds;
    }

    /**
     * @param rounds
     */
    public void setRounds(int rounds) {
        this.rounds = rounds;
    }

    /**
     * @return int
     */
    public int getPoints() {
        return this.points;
    }

    /**
     * @param points
     */
    public void setPoints(int points) {
        this.points = points;
    }

    /**
     * @return int
     */
    public int getWins() {
        return this.wins;
    }

    /**
     * @param wins
     */
    public void setWins(int wins) {
        this.wins = wins;
    }

    /**
     * @return int
     */
    public int getLoses() {
        return this.loses;
    }

    /**
     * @param loses
     */
    public void setLoses(int loses) {
        this.loses = loses;
    }

    /**
     * @return String
     */
    public String getList() {
        return this.list;
    }

    /**
     * @param list
     */
    public void setList(String list) {
        this.list = list;
    }

    /**
     * @param arg0
     * @return int
     */
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
