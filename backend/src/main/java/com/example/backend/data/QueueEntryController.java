package com.example.backend.data;

import java.security.Principal;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import com.example.backend.data.repositories.EventRepository;
import com.example.backend.data.repositories.QueueEntryRepository;

@Controller
@Secured("ROLE_NORMAL")
public class QueueEntryController {

    @Autowired
    QueueEntryRepository queueEntryRepository;

    @Autowired
    private EventRepository eventRepository;

    @QueryMapping
    Iterable<QueueEntry> getQueueOfEvent(@Argument(name = "id") int id) {
        return StreamSupport.stream(queueEntryRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEventID() == id).toList();
    }

    @QueryMapping
    Iterable<QueueEntry> getQueueOfUser(@Argument(name = "id") int id) {
        return StreamSupport.stream(queueEntryRepository.findAll().spliterator(), false)
                .filter((x) -> x.getUserID() == id).toList();
    }

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
