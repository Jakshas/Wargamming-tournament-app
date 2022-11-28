package com.example.backend.data;

import java.time.LocalDateTime;
import java.util.stream.StreamSupport;

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
            @Argument(name = "maxRounds") int maxRounds, @Argument(name = "roundTime") int roundTime) {

        Event n = new Event();
        n.setName(name);
        n.setRound(0);
        n.setMaxRound(maxRounds);
        n.setOrganizer(userRepository.findById(organizer).get());
        n.setRoundTime(roundTime);
        eventRepository.save(n);
        return n.getId().toString();
    }

    @QueryMapping
    public Event eventByID(@Argument(name = "id") int id) {
        var e = eventRepository.findById(id).get();
        e.setLastCalled(LocalDateTime.now().toString());
        return e;
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

    @QueryMapping
    public Iterable<Event> organizedEvents(@Argument(name = "id") int id) {
        return StreamSupport.stream(eventRepository.findAll().spliterator(), false)
                .filter((x) -> x.getOrganizer().getId() == id).toList();
    }
}
