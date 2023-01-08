package com.example.backend.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import com.example.backend.data.Event;
import com.example.backend.data.EventGameRecord;
import com.example.backend.data.EventUserRecord;
import com.example.backend.data.repositories.EventGameRecordRepository;
import com.example.backend.data.repositories.EventRepository;
import com.example.backend.data.repositories.EventUserRecordRepository;
import com.example.backend.data.repositories.UserRepository;

/**
 * Controller for EventGameRecord
 **/
@Controller
@Secured("ROLE_NORMAL")
public class EventGameRecordController {
    @Autowired
    EventUserRecordRepository eventUserRecordRepository;

    @Autowired
    EventGameRecordRepository eventGameRecordRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Make new match
     * 
     * @param eventID     Id of event
     * @param round       Numer of round
     * @param playerOneID Id of player one
     * @param playerTwoID Id of player two
     * @return String
     */
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

    /**
     * Set match points
     * 
     * @param principal       Principal from Spring Security
     * @param matchID         Id of match
     * @param playerOnePoints Points of player one
     * @param playerTwoPoints Points of player two
     * @return String
     */
    @MutationMapping
    public String setMatchPoints(Principal principal, @Argument(name = "matchID") int matchID,
            @Argument(name = "playerOnePoints") int playerOnePoints,
            @Argument(name = "playerTwoPoints") int playerTwoPoints) {
        EventGameRecord n = eventGameRecordRepository.findById(matchID).get();
        if (Integer.valueOf(principal.getName()) != n.getEvent().getOrganizer().getId()) {
            return "User not autorised";
        }
        n.setPlayerOnePoints(playerOnePoints);
        n.setPlayerTwoPoints(playerTwoPoints);
        n.setDone(true);
        EventUserRecord u1 = StreamSupport.stream(n.getPlayerOne().getEventUserRecords().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == n.getEvent().getId())
                .findFirst().get();
        EventUserRecord u2 = null;
        if (n.getPlayerTwo() != null) {
            u2 = StreamSupport.stream(n.getPlayerTwo().getEventUserRecords().spliterator(), false)
                    .filter((x) -> x.getEvent().getId() == n.getEvent().getId())
                    .findFirst().get();
        }

        if (u2 != null) {
            var enemiesOfUser1 = u1.getEnemies();
            enemiesOfUser1.add(u2.getUser());
            u1.setEnemies(enemiesOfUser1);
            var enemiesOfUser2 = u2.getEnemies();
            enemiesOfUser2.add(u1.getUser());
            u2.setEnemies(enemiesOfUser2);
            u1.setPoints(u1.getPoints() + playerOnePoints);
            u2.setPoints(u2.getPoints() + playerTwoPoints);
            if (playerOnePoints > playerTwoPoints) {
                u1.setWins(u1.getWins() + 1);
                u2.setLoses(u2.getLoses() + 1);
            }
            if (playerOnePoints < playerTwoPoints) {
                u2.setWins(u2.getWins() + 1);
                u1.setLoses(u1.getLoses() + 1);
            } else {
                u2.setWins(u2.getWins() + 1);
                u1.setWins(u1.getWins() + 1);
            }
        } else {
            u1.setPoints(u1.getPoints() + playerOnePoints);
        }
        eventGameRecordRepository.save(n);
        eventUserRecordRepository.save(u1);
        eventUserRecordRepository.save(u2);
        return "Points changed";
    }

    /**
     * Get games of event
     * 
     * @param id Id of game
     * @return Iterable<EventGameRecord>
     */
    @QueryMapping
    public Iterable<EventGameRecord> getEventGameRecordForEvent(@Argument(name = "id") int id) {

        return StreamSupport.stream(eventGameRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == id).toList();
    }

    /**
     * Get games of event for round
     * 
     * @param id    Id of game
     * @param round Numer of round
     * @return Iterable<EventGameRecord>
     */
    @QueryMapping
    public Iterable<EventGameRecord> getEventGameRecordForEventForGame(@Argument(name = "id") int id,
            @Argument(name = "round") int round) {

        return StreamSupport.stream(eventGameRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == id & x.getRound() == round).toList();
    }

    /**
     * Check if two players played angainst each other
     * 
     * @param user1 Stats of plyer one for event
     * @param user2 Stats of plyer two for event
     * @return boolean
     */
    private boolean checkIfPlayed(EventUserRecord user1, EventUserRecord user2) {
        Event e = user1.getEvent();
        for (EventGameRecord iterable_element : e.getEventGameRecords()) {
            if ((user1.getUser().getId() == iterable_element.getPlayerOne().getId()
                    && (iterable_element.getPlayerTwo() != null
                            && user2.getUser().getId() == iterable_element.getPlayerTwo().getId()))
                    || ((iterable_element.getPlayerTwo() != null
                            && user1.getUser().getId() == iterable_element.getPlayerTwo().getId())
                            && user2.getUser().getId() == iterable_element.getPlayerOne().getId())) {
                return true;
            }
        }
        return false;
    }

    /**
     * Make parrings for next round and go to next round
     * 
     * @param principal Principal from Spring Security
     * @param eventID   Id of event
     * @return String
     */
    @MutationMapping
    public String makeParings(Principal principal, @Argument(name = "eventID") int eventID) {

        Event e = eventRepository.findById(eventID).get();
        if (Integer.valueOf(principal.getName()) != e.getOrganizer().getId()) {
            return "User not autorised";
        }
        if (e.getMaxRounds() == e.getRound()) {
            e.setRound(e.getRound() + 1);
            e.setState(Event.State.DONE);
            eventRepository.save(e);
            return "Finished";
        }
        if (e.getRound() == 0) {
            e.setState(Event.State.INPROGRESS);
        }
        e.setRoundEnd((LocalDateTime.now().plusMinutes(e.getRoundTime())).toString());
        e.setRound(e.getRound() + 1);
        Event event = eventRepository.findById(eventID).get();
        ArrayList<EventUserRecord> eventUserRecords = new ArrayList<EventUserRecord>(event.getEventUserRecords());
        eventUserRecords.sort(new Comparator<EventUserRecord>() {
            public int compare(EventUserRecord o1, EventUserRecord o2) {
                if (o1.getPoints() == o2.getPoints())
                    return 0;
                return o1.getPoints() < o2.getPoints() ? 1 : -1;
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
        eventRepository.save(e);
        return "Parings made";
    }
}
