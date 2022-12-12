package com.example.backend.data;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Event {

    enum State {
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

    public State getState() {
        return this.state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public int getRoundTime() {
        return this.roundTime;
    }

    public void setRoundTime(int roundTime) {
        this.roundTime = roundTime;
    }

    public String getRoundEnd() {
        return this.roundEnd;
    }

    public void setRoundEnd(String roundEnd) {
        this.roundEnd = roundEnd;
    }

    public String getLastCalled() {
        return this.lastCalled;
    }

    public void setLastCalled(String lastCalled) {
        this.lastCalled = lastCalled;
    }

    @OneToMany(mappedBy = "event")
    private Set<EventGameRecord> eventGameRecords;
    @OneToMany(mappedBy = "event")
    private Set<EventUserRecord> eventUserRecords;

    public int getMaxRounds() {
        return this.maxRounds;
    }

    public void setMaxRounds(int maxRounds) {
        this.maxRounds = maxRounds;
    }

    public Set<EventGameRecord> getEventGameRecords() {
        return this.eventGameRecords;
    }

    public void setEventGameRecords(Set<EventGameRecord> eventGameRecords) {
        this.eventGameRecords = eventGameRecords;
    }

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

    public Integer getRound() {
        return round;
    }

    public void setRound(Integer round) {
        this.round = round;
    }

    public Integer getMaxRound() {
        return maxRounds;
    }

    public void setMaxRound(Integer maxRounds) {
        this.maxRounds = maxRounds;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getOrganizer() {
        return organizer;
    }

    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }

    public void addParticipant(User participant) {
        EventUserRecord eventUserRecord = new EventUserRecord();
        eventUserRecord.setUser(participant);
        eventUserRecord.setEvent(this);
        this.eventUserRecords.add(eventUserRecord);
    }
}
