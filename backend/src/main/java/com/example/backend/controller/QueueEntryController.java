package com.example.backend.controller;

import java.security.Principal;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import com.example.backend.data.QueueEntry;
import com.example.backend.data.repositories.EventRepository;
import com.example.backend.data.repositories.QueueEntryRepository;

/**
 * Controller for QueueEntry
 **/
@Controller
@Secured("ROLE_NORMAL")
public class QueueEntryController {

    @Autowired
    QueueEntryRepository queueEntryRepository;

    @Autowired
    private EventRepository eventRepository;

    /**
     * Get queue for event
     * 
     * @param id Id of event
     * @return Iterable<QueueEntry>
     */
    @QueryMapping
    Iterable<QueueEntry> getQueueOfEvent(@Argument(name = "id") int id) {
        return StreamSupport.stream(queueEntryRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEventID() == id).toList();
    }

    /**
     * Get queue for user
     * 
     * @param id Id of user
     * @return Iterable<QueueEntry>
     */
    @QueryMapping
    Iterable<QueueEntry> getQueueOfUser(@Argument(name = "id") int id) {
        return StreamSupport.stream(queueEntryRepository.findAll().spliterator(), false)
                .filter((x) -> x.getUserID() == id).toList();
    }

    /**
     * Add user to queue
     * 
     * @param principal Principal from Spring Security
     * @param userID    Id of user
     * @param eventID   Id of event
     * @return String
     */
    @MutationMapping
    public String addToQueue(Principal principal, @Argument(name = "userID") int userID,
            @Argument(name = "eventID") int eventID) {
        if (Integer.valueOf(principal.getName()) != userID) {
            return "User not autorised";
        }
        QueueEntry x = new QueueEntry();
        x.setEventID(eventID);
        x.setUserID(userID);
        queueEntryRepository.save(x);
        return "Added";
    }

    /**
     * Delete user to queue
     * 
     * @param principal Principal from Spring Security
     * @param id        Id of queue entry
     * @return String
     */
    @MutationMapping
    public String deleteFromQueue(Principal principal, @Argument(name = "id") int id) {
        var eventid = queueEntryRepository.findById(id).get().getEventID();
        var q = eventRepository.findById(eventid).get();
        if (Integer.valueOf(principal.getName()) != q.getOrganizer().getId()) {
            return "User not autorised";
        }
        queueEntryRepository.deleteById(id);
        return "Deleted";
    }
}
