package com.example.backend.data;

import javax.persistence.ManyToOne;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class EventGameRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne
    private Event event;
    private int round;
    @ManyToOne
    private User playerOne;
    @ManyToOne
    private User playerTwo;
    private int playerOnePoints;
    private int playerTwoPoints;
    private boolean done;

    public boolean getDone() {
        return this.done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Event getEvent() {
        return this.event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public int getRound() {
        return this.round;
    }

    public void setRound(int round) {
        this.round = round;
    }

    public User getPlayerOne() {
        return this.playerOne;
    }

    public void setPlayerOne(User playerOne) {
        this.playerOne = playerOne;
    }

    public User getPlayerTwo() {
        return this.playerTwo;
    }

    public void setPlayerTwo(User playerTwo) {
        this.playerTwo = playerTwo;
    }

    public int getPlayerOnePoints() {
        return this.playerOnePoints;
    }

    public void setPlayerOnePoints(int playerOnePoints) {
        this.playerOnePoints = playerOnePoints;
    }

    public int getPlayerTwoPoints() {
        return this.playerTwoPoints;
    }

    public void setPlayerTwoPoints(int playerTwoPoints) {
        this.playerTwoPoints = playerTwoPoints;
    }

}
