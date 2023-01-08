package com.example.backend.data;

import javax.persistence.ManyToOne;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Class describing games in event
 **/
@Entity
public class EventGameRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne(cascade = CascadeType.REMOVE)
    private Event event;
    private int round;
    @ManyToOne
    private User playerOne;
    @ManyToOne
    private User playerTwo;
    private int playerOnePoints;
    private int playerTwoPoints;
    private boolean done;

    /**
     * @return boolean
     */
    public boolean getDone() {
        return this.done;
    }

    /**
     * @param done
     */
    public void setDone(boolean done) {
        this.done = done;
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
    public int getRound() {
        return this.round;
    }

    /**
     * @param round
     */
    public void setRound(int round) {
        this.round = round;
    }

    /**
     * @return User
     */
    public User getPlayerOne() {
        return this.playerOne;
    }

    /**
     * @param playerOne
     */
    public void setPlayerOne(User playerOne) {
        this.playerOne = playerOne;
    }

    /**
     * @return User
     */
    public User getPlayerTwo() {
        return this.playerTwo;
    }

    /**
     * @param playerTwo
     */
    public void setPlayerTwo(User playerTwo) {
        this.playerTwo = playerTwo;
    }

    /**
     * @return int
     */
    public int getPlayerOnePoints() {
        return this.playerOnePoints;
    }

    /**
     * @param playerOnePoints
     */
    public void setPlayerOnePoints(int playerOnePoints) {
        this.playerOnePoints = playerOnePoints;
    }

    /**
     * @return int
     */
    public int getPlayerTwoPoints() {
        return this.playerTwoPoints;
    }

    /**
     * @param playerTwoPoints
     */
    public void setPlayerTwoPoints(int playerTwoPoints) {
        this.playerTwoPoints = playerTwoPoints;
    }

}
