package com.example.backend.data;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

/**
 * Class describing event
 **/
@Entity
public class Event {

    public enum State {
        DONE,
        INPROGRESS,
        BEFORE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    @ManyToOne
    private User organizer;
    private int round;
    private int maxRounds;
    private String roundEnd;
    private String lastCalled;
    private int roundTime;
    private State state;

    /**
     * @return State
     */
    public State getState() {
        return this.state;
    }

    /**
     * @param state
     */
    public void setState(State state) {
        this.state = state;
    }

    /**
     * @return int
     */
    public int getRoundTime() {
        return this.roundTime;
    }

    /**
     * @param roundTime
     */
    public void setRoundTime(int roundTime) {
        this.roundTime = roundTime;
    }

    /**
     * @return String
     */
    public String getRoundEnd() {
        return this.roundEnd;
    }

    /**
     * @param roundEnd
     */
    public void setRoundEnd(String roundEnd) {
        this.roundEnd = roundEnd;
    }

    /**
     * @return String
     */
    public String getLastCalled() {
        return this.lastCalled;
    }

    /**
     * @param lastCalled
     */
    public void setLastCalled(String lastCalled) {
        this.lastCalled = lastCalled;
    }

    @OneToMany(mappedBy = "event")
    private Set<EventGameRecord> eventGameRecords;
    @OneToMany(mappedBy = "event")
    private Set<EventUserRecord> eventUserRecords;

    /**
     * @return int
     */
    public int getMaxRounds() {
        return this.maxRounds;
    }

    /**
     * @param maxRounds
     */
    public void setMaxRounds(int maxRounds) {
        this.maxRounds = maxRounds;
    }

    /**
     * @return Set<EventGameRecord>
     */
    public Set<EventGameRecord> getEventGameRecords() {
        return this.eventGameRecords;
    }

    /**
     * @param eventGameRecords
     */
    public void setEventGameRecords(Set<EventGameRecord> eventGameRecords) {
        this.eventGameRecords = eventGameRecords;
    }

    /**
     * @return Set<EventUserRecord>
     */
    public Set<EventUserRecord> getEventUserRecords() {
        return this.eventUserRecords;
    }

    /**
     * @param eventUserRecords
     */
    public void setEventUserRecords(Set<EventUserRecord> eventUserRecords) {
        this.eventUserRecords = eventUserRecords;
    }

    /**
     * @return Integer
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return Integer
     */
    public Integer getRound() {
        return round;
    }

    /**
     * @param round
     */
    public void setRound(Integer round) {
        this.round = round;
    }

    /**
     * @return Integer
     */
    public Integer getMaxRound() {
        return maxRounds;
    }

    /**
     * @param maxRounds
     */
    public void setMaxRound(Integer maxRounds) {
        this.maxRounds = maxRounds;
    }

    /**
     * @return String
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return User
     */
    public User getOrganizer() {
        return organizer;
    }

    /**
     * @param organizer
     */
    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }

    /**
     * @param participant
     */
    public void addParticipant(User participant) {
        EventUserRecord eventUserRecord = new EventUserRecord();
        eventUserRecord.setUser(participant);
        eventUserRecord.setEvent(this);
        this.eventUserRecords.add(eventUserRecord);
    }
}
