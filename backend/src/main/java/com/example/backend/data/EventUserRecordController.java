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
import com.example.backend.data.repositories.EventUserRecordRepository;
import com.example.backend.data.repositories.UserRepository;

@Controller
@Secured("ROLE_NORMAL")
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
                .filter((x) -> x.getEvent().getId() == id)
                .sorted()
                .toList();
    }

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

    @MutationMapping
    public String deleteUserFromEvent(Principal principal, @Argument(name = "id") int id) {
        var e = eventUserRecordRepository.findById(id).get();
        if (Integer.valueOf(principal.getName()) != e.getEvent().getOrganizer().getId()) {
            return "User not autorised";
        }
        eventUserRecordRepository.deleteById(id);
        return "Deleted";
    }

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

    @QueryMapping
    public String getListForUserInEvent(@Argument(name = "eventID") int eventID,
            @Argument(name = "userID") int userID) {
        return StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == eventID && x.getUser().getId() == userID).findFirst().get()
                .getList();
    }

    @MutationMapping
    public String setListForUserInEvent(@Argument(name = "eventID") int eventID,
            @Argument(name = "userID") int userID, @Argument(name = "list") String list) {
        EventUserRecord record = StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == eventID && x.getUser().getId() == userID).findFirst().get();
        record.setList(list);
        eventUserRecordRepository.save(record);
        return "Changed";
    }

    @QueryMapping
    public int getPlaceForUserInEvent(@Argument(name = "eventID") int eventID, @Argument(name = "userID") int userID) {
        return 0;
    }

}
