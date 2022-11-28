package com.example.backend.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class QueueEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int userID;

    private int eventID;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getEventID() {
        return this.eventID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

}
