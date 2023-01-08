package com.example.backend.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import com.example.backend.data.Event;
import com.example.backend.data.EventUserRecord;
import com.example.backend.data.repositories.EventRepository;
import com.example.backend.data.repositories.UserRepository;

/**
 * Controller for Event
 **/
@Controller
@Secured("ROLE_NORMAL")
public class EventController {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;

    /**
     * Adds Event to database
     * 
     * @param principal Principal from Spring Security
     * @param name      Name of event
     * @param organizer organizer of event
     * @param maxRounds maxRounds of event
     * @param roundTime round time of event
     * @return String
     */
    @MutationMapping
    public String addEvent(Principal principal, @Argument(name = "name") String name,
            @Argument(name = "organizer") int organizer,
            @Argument(name = "maxRounds") int maxRounds, @Argument(name = "roundTime") int roundTime,
            @Argument(name = "description") String description) {
        if (Integer.valueOf(principal.getName()) != organizer) {
            return "User not autorised";
        }
        Event n = new Event();
        n.setName(name);
        n.setRound(0);
        n.setMaxRound(maxRounds);
        n.setOrganizer(userRepository.findById(organizer).get());
        n.setRoundTime(roundTime);
        n.setState(Event.State.BEFORE);
        n.setDescription(description);
        eventRepository.save(n);
        return n.getId().toString();
    }

    /**
     * @param id
     * @param description
     * @return String
     */
    @MutationMapping
    public String setDescription(@Argument(name = "id") int id, @Argument(name = "description") String description) {
        var n = eventRepository.findById(id).get();
        n.setDescription(description);
        eventRepository.save(n);
        return "Changed";
    }

    /**
     * Get Event by ID
     * 
     * @param id ID of event
     * @return Event
     */
    @QueryMapping
    public Event eventByID(@Argument(name = "id") int id) {
        var e = eventRepository.findById(id).get();
        e.setLastCalled(LocalDateTime.now().toString());
        return e;
    }

    /**
     * @param principal Principal from Spring Security
     * @param id        ID of event
     * @return Iterable<Event>
     */
    @QueryMapping
    public Iterable<Event> eventsOfUser(Principal principal, @Argument(name = "id") int id) {
        if (Integer.valueOf(principal.getName()) != id) {
            return new ArrayList<Event>();
        }
        var events = eventRepository.findAll();
        return StreamSupport.stream(events.spliterator(), false).filter((x) -> {
            var v = x.getEventUserRecords();
            for (EventUserRecord event : v) {
                if (event.getUser().getId() == id) {
                    return true;
                }
            }
            return false;
        }).toList();
    }

    /**
     * @param id ID of event
     * @return String
     */
    @MutationMapping
    public String deleteEvent(@Argument(name = "id") int id) {

        eventRepository.deleteById(id);

        return "Deleted";
    }

    /**
     * Get event to next round
     * 
     * @param principal Principal from Spring Security
     * @param id        ID of event
     * @return String
     */
    @MutationMapping
    public String nextRound(Principal principal, @Argument(name = "id") int id) {

        Event e = eventRepository.findById(id).get();
        if (Integer.valueOf(principal.getName()) != e.getOrganizer().getId()) {
            return "User not autorised";
        }
        e.setRound(e.getRound() + 1);
        return "Next";
    }

    /**
     * Add prticipant
     * 
     * @param principal   Principal from Spring Security
     * @param id          ID of event
     * @param participant ID of participant
     * @return String
     */
    @MutationMapping
    public String addParticipant(Principal principal, @Argument(name = "id") int id,
            @Argument(name = "participant") int participant) {
        if (Integer.valueOf(principal.getName()) != eventRepository.findById(id).get().getOrganizer().getId()) {
            return "User not autorised";
        }
        eventRepository.findById(id).get().addParticipant(userRepository.findById(participant).get());

        return "Added";
    }

    /**
     * Get all events
     * 
     * @return Iterable<Event>
     */
    @QueryMapping
    public Iterable<Event> events() {
        return eventRepository.findAll();
    }

    /**
     * Get organized events
     * 
     * @param principal Principal from Spring Security
     * @param id        ID of user
     * @return Iterable<Event>
     */
    @QueryMapping
    public Iterable<Event> organizedEvents(Principal principal, @Argument(name = "id") int id) {
        if (Integer.valueOf(principal.getName()) != id) {
            return new ArrayList<Event>();
        }
        return StreamSupport.stream(eventRepository.findAll().spliterator(), false)
                .filter((x) -> x.getOrganizer().getId() == id).toList();
    }
}
