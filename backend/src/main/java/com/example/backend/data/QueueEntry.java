package com.example.backend.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Class describing queue entries of users
 **/
@Entity
public class QueueEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int userID;

    private int eventID;

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
     * @return int
     */
    public int getUserID() {
        return this.userID;
    }

    /**
     * @param userID
     */
    public void setUserID(int userID) {
        this.userID = userID;
    }

    /**
     * @return int
     */
    public int getEventID() {
        return this.eventID;
    }

    /**
     * @param eventID
     */
    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

}
