package com.example.backend.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.backend.data.repositories.EventRepository;
import com.example.backend.data.repositories.UserRepository;

@Controller
public class EventController {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;

    @MutationMapping
    public String addEvent(@Argument(name = "name") String name, @Argument(name = "organizer") int organizer,
            @Argument(name = "maxRounds") int maxRounds) {

        Event n = new Event();
        n.setName(name);
        n.setRound(0);
        n.setMaxRound(maxRounds);
        n.setOrganizer(userRepository.findById(organizer).get());
        eventRepository.save(n);
        return n.getId().toString();
    }

    @MutationMapping
    public String deleteEvent(@Argument(name = "id") int id) {

        eventRepository.deleteById(id);

        return "Deleted";
    }

    @MutationMapping
    public String nextRound(@Argument(name = "id") int id) {

        Event e = eventRepository.findById(id).get();
        e.setRound(e.getRound() + 1);
        return "Deleted";
    }

    @MutationMapping
    public String addParticipant(@Argument(name = "id") int id, @Argument(name = "participant") int participant) {

        eventRepository.findById(id).get().addParticipant(userRepository.findById(participant).get());

        return "Deleted";
    }

    @QueryMapping
    public Iterable<Event> events() {
        return eventRepository.findAll();
    }
}
