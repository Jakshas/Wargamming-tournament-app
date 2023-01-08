package com.example.backend.controller;

import java.security.Principal;
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
import com.example.backend.data.repositories.EventUserRecordRepository;
import com.example.backend.data.repositories.UserRepository;

/**
 * Controller for EventUserRecord
 **/
@Controller
@Secured("ROLE_NORMAL")
public class EventUserRecordController {
    @Autowired
    EventUserRecordRepository eventUserRecordRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Get score for user
     * 
     * @param id Id of user
     * @return Iterable<EventUserRecord>
     */
    @QueryMapping
    public Iterable<EventUserRecord> getEventUserRecordForUser(@Argument(name = "id") int id) {

        return StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getUser().getId() == id).toList();
    }

    /**
     * Get scores for event
     * 
     * @param id Id of event
     * @return Iterable<EventUserRecord>
     */
    @QueryMapping
    public Iterable<EventUserRecord> getEventUserRecordForEvent(@Argument(name = "id") int id) {

        return StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == id)
                .sorted()
                .toList();
    }

    /**
     * Get score for event for summary of event
     * 
     * @param id Id of event
     * @return Iterable<EventUserRecord>
     */
    @QueryMapping
    public Iterable<EventUserRecord> getEventUserRecordForEventSummary(@Argument(name = "id") int id) {

        var s = StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == id).toList();
        s.forEach((x) -> {
            float sum = 0;
            for (var v : x.getEnemies()) {
                var c = StreamSupport.stream(v.getEventUserRecords().spliterator(), false)
                        .filter((y) -> y.getEvent().getId() == id).findFirst().get();
                sum += c.getPoints();
            }
            sum = sum / (x.getEnemies().size() == 0 ? 1 : x.getEnemies().size());
            x.setSos(sum);
        });

        var places = StreamSupport.stream(s.spliterator(), false)
                .sorted()
                .toList();
        int i = 1;
        for (EventUserRecord eventUserRecord : places) {
            eventUserRecord.setPlace(i);
            i++;
        }
        eventUserRecordRepository.saveAll(places);
        places.forEach((x) -> x.setPoints(x.getBonusPoints() + x.getPoints()));
        return places;
    }

    /**
     * Add user to event
     * 
     * @param principal Principal from Spring Security
     * @param userID    Id of user
     * @param eventID   Id of event
     * @return String
     */
    @MutationMapping
    public String addUserToEvent(Principal principal, @Argument(name = "userID") int userID,
            @Argument(name = "eventID") int eventID) {
        Event e = eventRepository.findById(eventID).get();
        if (Integer.valueOf(principal.getName()) != e.getOrganizer().getId()) {
            return "User not autorised";
        }
        EventUserRecord n = new EventUserRecord();
        n.setUser(userRepository.findById(userID).get());
        n.setEvent(eventRepository.findById(eventID).get());
        n.setPoints(0);
        n.setList("");
        n.setBonusPoints(0);
        n.setSos(0);
        eventUserRecordRepository.save(n);
        return "Added";
    }

    /**
     * Delete user form event
     * 
     * @param principal Principal from Spring Security
     * @param id        Id of EventUserRecord
     * @return String
     */
    @MutationMapping
    public String deleteUserFromEvent(Principal principal, @Argument(name = "id") int id) {
        var e = eventUserRecordRepository.findById(id).get();
        if (Integer.valueOf(principal.getName()) != e.getEvent().getOrganizer().getId()) {
            return "User not autorised";
        }
        eventUserRecordRepository.deleteById(id);
        return "Deleted";
    }

    /**
     * Set bonus points for user in event
     * 
     * @param principal   Principal from Spring Security
     * @param id          Id of EventUserRecord
     * @param bonusPoints Bonus points for user score
     * @return String
     */
    @MutationMapping
    public String setBonusPoints(Principal principal, @Argument(name = "id") int id,
            @Argument(name = "bonusPoints") int bonusPoints) {
        EventUserRecord record = eventUserRecordRepository.findById(id).get();
        if (Integer.valueOf(principal.getName()) != record.getEvent().getOrganizer().getId()) {
            return "User not autorised";
        }
        record.setBonusPoints(bonusPoints);
        eventUserRecordRepository.save(record);
        return "Deleted";
    }

    /**
     * Get list for user in event
     * 
     * @param eventID Id of event
     * @param userID  Id of user
     * @return String
     */
    @QueryMapping
    public String getListForUserInEvent(@Argument(name = "eventID") int eventID,
            @Argument(name = "userID") int userID) {
        return StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == eventID && x.getUser().getId() == userID).findFirst().get()
                .getList();
    }

    /**
     * Set list for user in event
     * 
     * @param eventID Id of event
     * @param userID  Id of user
     * @param list    List of user
     * @return String
     */
    @MutationMapping
    public String setListForUserInEvent(@Argument(name = "eventID") int eventID,
            @Argument(name = "userID") int userID, @Argument(name = "list") String list) {
        EventUserRecord record = StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == eventID && x.getUser().getId() == userID).findFirst().get();
        record.setList(list);
        eventUserRecordRepository.save(record);
        return "Changed";
    }

    /**
     * Get place for user in event
     * 
     * @param eventID Id of event
     * @param userID  Id of user
     * @return int
     */
    @QueryMapping
    public int getPlaceForUserInEvent(@Argument(name = "eventID") int eventID, @Argument(name = "userID") int userID) {
        return 0;
    }

}
