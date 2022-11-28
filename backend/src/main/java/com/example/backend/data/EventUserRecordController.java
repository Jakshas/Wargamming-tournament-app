package com.example.backend.data;

import java.util.Comparator;
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
                .filter((x) -> x.getEvent().getId() == id)
                .sorted(Comparator.comparingInt(EventUserRecord::getPoints).reversed())
                .toList();
    }

    @QueryMapping
    public Iterable<EventUserRecord> getEventUserRecordForEventSummary(@Argument(name = "id") int id) {

        var s = StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == id).toList();
        s.forEach((x) -> x.setPoints(x.getBonusPoints() + x.getPoints()));
        return StreamSupport.stream(s.spliterator(), false)
                .sorted(Comparator.comparingInt(EventUserRecord::getPoints).reversed())
                .toList();
    }

    @MutationMapping
    public String addUserToEvent(@Argument(name = "userID") int userID, @Argument(name = "eventID") int eventID) {
        EventUserRecord n = new EventUserRecord();
        n.setUser(userRepository.findById(userID).get());
        n.setEvent(eventRepository.findById(eventID).get());
        n.setPoints(0);
        n.setList("");
        n.setBonusPoints(0);
        eventUserRecordRepository.save(n);
        return "Added";
    }

    @MutationMapping
    public String deleteUserFromEvent(@Argument(name = "id") int id) {
        eventUserRecordRepository.deleteById(id);
        return "Deleted";
    }

    @MutationMapping
    public String setBonusPoints(@Argument(name = "id") int id,
            @Argument(name = "bonusPoints") int bonusPoints) {
        EventUserRecord record = eventUserRecordRepository.findById(id).get();
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
}
