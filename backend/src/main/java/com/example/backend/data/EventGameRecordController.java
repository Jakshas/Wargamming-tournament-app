package com.example.backend.data;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.backend.data.repositories.EventGameRecordRepository;
import com.example.backend.data.repositories.EventRepository;
import com.example.backend.data.repositories.UserRepository;

@Controller
public class EventGameRecordController {

    @Autowired
    EventGameRecordRepository eventGameRecordRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @MutationMapping
    public String addMatch(@Argument(name = "eventID") int eventID, @Argument(name = "round") int round,
            @Argument(name = "playerOneID") int playerOneID, @Argument(name = "playerTwoID") int playerTwoID) {
        EventGameRecord n = new EventGameRecord();
        n.setRound(round);
        n.setEvent(eventRepository.findById(eventID).get());
        n.setPlayerOne(userRepository.findById(playerOneID).get());
        n.setPlayerTwo(userRepository.findById(playerTwoID).get());
        n.setPlayerOnePoints(0);
        n.setPlayerTwoPoints(0);
        eventGameRecordRepository.save(n);
        return "Added";
    }

    @MutationMapping
    public String setMatchPoints(@Argument(name = "matchID") int matchID,
            @Argument(name = "playerOnePoints") int playerOnePoints,
            @Argument(name = "playerTwoPoints") int playerTwoPoints) {
        EventGameRecord n = eventGameRecordRepository.findById(matchID).get();
        n.setPlayerOnePoints(playerOnePoints);
        n.setPlayerTwoPoints(playerTwoPoints);
        eventGameRecordRepository.save(n);
        return "Points changed";
    }

    @QueryMapping
    public Iterable<EventGameRecord> getEventGameRecordForEvent(@Argument(name = "id") int id) {

        return StreamSupport.stream(eventGameRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == id).toList();
    }

    private boolean checkIfPlayed(EventUserRecord user1, EventUserRecord user2) {
        Event e = user1.getEvent();
        for (EventGameRecord iterable_element : e.getEventGameRecords()) {
            if ((user1.getUser().getId() == iterable_element.getPlayerOne().getId()
                    && user2.getUser().getId() == iterable_element.getPlayerTwo().getId())
                    || (user1.getUser().getId() == iterable_element.getPlayerTwo().getId()
                            && user2.getUser().getId() == iterable_element.getPlayerOne().getId())) {
                return true;
            }
        }
        return false;
    }

    @MutationMapping
    public String makeParings(@Argument(name = "eventID") int eventID) {

        Event event = eventRepository.findById(eventID).get();
        ArrayList<EventUserRecord> eventUserRecords = new ArrayList<EventUserRecord>(event.getEventUserRecords());
        eventUserRecords.sort(new Comparator<EventUserRecord>() {
            public int compare(EventUserRecord o1, EventUserRecord o2) {
                if (o1.getPoints() == o2.getPoints())
                    return 0;
                return o1.getPoints() < o2.getPoints() ? -1 : 1;
            }
        });
        while (eventUserRecords.size() > 1) {
            EventUserRecord user1 = eventUserRecords.remove(0);
            int i = 0;
            EventUserRecord user2 = eventUserRecords.get(i);
            while (i < eventUserRecords.size() && checkIfPlayed(user1, user2)) {
                i++;
                user2 = eventUserRecords.get(i);
            }
            user2 = eventUserRecords.remove(i);
            EventGameRecord n = new EventGameRecord();
            n.setRound(eventRepository.findById(eventID).get().getRound());
            n.setEvent(eventRepository.findById(eventID).get());
            n.setPlayerOne(user1.getUser());
            n.setPlayerTwo(user2.getUser());
            n.setPlayerOnePoints(0);
            n.setPlayerTwoPoints(0);
            eventGameRecordRepository.save(n);
        }
        if (eventUserRecords.size() == 1) {
            EventGameRecord n = new EventGameRecord();
            n.setRound(eventRepository.findById(eventID).get().getRound());
            n.setEvent(eventRepository.findById(eventID).get());
            n.setPlayerOne(eventUserRecords.remove(0).getUser());
            n.setPlayerTwo(null);
            n.setPlayerOnePoints(0);
            n.setPlayerTwoPoints(0);
            eventGameRecordRepository.save(n);
        }
        return "Parings made";
    }
}
