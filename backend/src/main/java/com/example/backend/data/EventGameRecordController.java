package com.example.backend.data;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import com.example.backend.data.repositories.EventGameRecordRepository;
import com.example.backend.data.repositories.EventRepository;
import com.example.backend.data.repositories.EventUserRecordRepository;
import com.example.backend.data.repositories.UserRepository;

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
        List<EventUserRecord> list = StreamSupport.stream(n.getEvent().getEventUserRecords().spliterator(), false)
                .filter((x) -> x.getUser().getId() == n.getPlayerOne().getId()
                        || (n.getPlayerTwo() != null && x.getUser().getId() == n.getPlayerTwo().getId()))
                .toList();
        if (list.size() > 1) {
            var enemiesOfUser1 = list.get(0).getEnemies();
            enemiesOfUser1.add(n.getPlayerTwo());
            list.get(0).setEnemies(enemiesOfUser1);
            var enemiesOfUser2 = list.get(1).getEnemies();
            enemiesOfUser2.add(n.getPlayerOne());
            list.get(1).setEnemies(enemiesOfUser2);
            if (list.get(0).getUser().getId() == n.getPlayerOne().getId()) {
                list.get(0).setPoints(list.get(0).getPoints() + playerOnePoints);
                list.get(1).setPoints(list.get(1).getPoints() + playerTwoPoints);
                if (playerOnePoints > playerTwoPoints) {
                    list.get(0).setWins(list.get(0).getWins() + 1);
                }
                if (playerOnePoints < playerTwoPoints) {
                    list.get(1).setWins(list.get(1).getWins() + 1);
                }
                if (playerOnePoints == playerTwoPoints) {
                    list.get(1).setWins(list.get(1).getWins() + 1);
                    list.get(0).setWins(list.get(0).getWins() + 1);
                }
            } else {
                list.get(0).setPoints(list.get(0).getPoints() + playerTwoPoints);
                list.get(1).setPoints(list.get(1).getPoints() + playerOnePoints);
                if (playerOnePoints > playerTwoPoints) {
                    list.get(1).setWins(list.get(1).getWins() + 1);
                }
                if (playerOnePoints < playerTwoPoints) {
                    list.get(0).setWins(list.get(0).getWins() + 1);
                }
                if (playerOnePoints == playerTwoPoints) {
                    list.get(1).setWins(list.get(1).getWins() + 1);
                    list.get(0).setWins(list.get(0).getWins() + 1);
                }
            }
        } else {
            list.get(0).setPoints(list.get(0).getPoints() + playerOnePoints);
        }
        eventGameRecordRepository.save(n);
        eventUserRecordRepository.saveAll(list);
        return "Points changed";
    }

    @QueryMapping
    public Iterable<EventGameRecord> getEventGameRecordForEvent(@Argument(name = "id") int id) {

        return StreamSupport.stream(eventGameRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == id).toList();
    }

    @QueryMapping
    public Iterable<EventGameRecord> getEventGameRecordForEventForGame(@Argument(name = "id") int id,
            @Argument(name = "round") int round) {

        return StreamSupport.stream(eventGameRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == id & x.getRound() == round).toList();
    }

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

    @MutationMapping
    public String makeParings(Principal principal, @Argument(name = "eventID") int eventID) {

        Event e = eventRepository.findById(eventID).get();
        if (Integer.valueOf(principal.getName()) != e.getOrganizer().getId()) {
            return "User not autorised";
        }
        if (e.getMaxRounds() == e.getRound()) {
            return "Finished";
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
