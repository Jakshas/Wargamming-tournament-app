package com.example.backend.data;

import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.backend.data.repositories.EventRepository;
import com.example.backend.data.repositories.EventUserRecordRepository;
import com.example.backend.data.repositories.UserRepository;

@Controller
public class EventUserRecordController {
    @Autowired
    EventUserRecordRepository eventUserRecordRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @QueryMapping
    public Iterable<EventUserRecord> getEventUserRecordForUser(@Argument(name = "id") int id) {

        return StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getUser().getId() == id).toList();
    }

    @QueryMapping
    public Iterable<EventUserRecord> getEventUserRecordForEvent(@Argument(name = "id") int id) {

        return StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == id).toList();
    }

    @MutationMapping
    public String addUserToEvent(int userID, int evenID) {
        EventUserRecord n = new EventUserRecord();
        n.setUser(userRepository.findById(userID).get());
        n.setEvent(eventRepository.findById(evenID).get());
        eventUserRecordRepository.save(n);
        return "Added";
    }
}
