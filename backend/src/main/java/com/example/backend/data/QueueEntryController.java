package com.example.backend.data;

import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.backend.data.repositories.QueueEntryRepository;

@Controller
public class QueueEntryController {

    @Autowired
    QueueEntryRepository queueEntryRepository;

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
    public String addToQueue(@Argument(name = "userID") int userID, @Argument(name = "eventID") int eventID) {
        QueueEntry x = new QueueEntry();
        x.setEventID(eventID);
        x.setUserID(userID);
        queueEntryRepository.save(x);
        return "Added";
    }

    @MutationMapping
    public String deleteFromQueue(@Argument(name = "id") int id) {
        queueEntryRepository.deleteById(id);
        return "Deleted";
    }
}
