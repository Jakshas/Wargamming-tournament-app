package com.example.backend.controller;

import java.util.Optional;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import com.example.backend.data.User;
import com.example.backend.data.UserStats;
import com.example.backend.data.repositories.EventUserRecordRepository;
import com.example.backend.data.repositories.QueueEntryRepository;
import com.example.backend.data.repositories.UserRepository;

/**
 * Controller for QueueEntry
 **/
@Controller
@Secured("ROLE_NORMAL")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QueueEntryRepository queueEntryRepository;
    @Autowired
    private EventUserRecordRepository eventUserRecordRepository;

    /**
     * Change password for user
     * 
     * @param id          Id of user
     * @param oldPassword Old password
     * @param newPassword New password
     * @return String
     */
    @MutationMapping
    public String changePassword(@Argument(name = "id") int id, @Argument(name = "oldPassword") String oldPassword,
            @Argument(name = "newPassword") String newPassword) {

        Optional<User> n = userRepository.findById(id);
        if (n.isPresent()) {
            if (n.get().getPassword() == oldPassword) {
                n.get().setPassword(newPassword);
                userRepository.save(n.get());
            } else {
                return "Password Not Correct";
            }
        } else {
            return "Not Present";
        }
        return "Changed";
    }

    /**
     * Delete user
     * 
     * @param id Id of user
     * @return String
     */
    @MutationMapping
    public String deleteUser(@Argument(name = "id") int id) {

        userRepository.deleteById(id);

        return "Deleted";
    }

    /**
     * Get all users
     * 
     * @return Iterable<User>
     */
    @QueryMapping
    public Iterable<User> users() {
        return userRepository.findAll();
    }

    /**
     * Get user by ID
     * 
     * @param id Id of user
     * @return User
     */
    @QueryMapping
    public User userByID(@Argument(name = "id") int id) {
        return userRepository.findById(id).get();
    }

    /**
     * Get all users in event
     * 
     * @param userID  Id of user
     * @param eventID Id of event
     * @return String
     */
    @QueryMapping
    public String userInEvent(@Argument(name = "userID") int userID, @Argument(name = "eventID") int eventID) {
        User u = userRepository.findById(userID).get();
        if (StreamSupport.stream(u.getEventUserRecords().spliterator(), false)
                .filter((x) -> x.getEvent().getId() == eventID)
                .findAny().isPresent()) {
            return "Signed";
        } else {
            if (StreamSupport.stream(queueEntryRepository.findAll().spliterator(), false)
                    .filter((x) -> x.getEventID() == eventID && x.getUserID() == userID).findAny().isPresent()) {
                return "In Queue";
            }
        }
        return "Not";
    }

    /**
     * Get statistics for user
     * 
     * @param id Id of user
     * @return UserStats
     */
    @QueryMapping
    public UserStats statsForUser(@Argument(name = "id") int id) {
        var records = StreamSupport.stream(eventUserRecordRepository.findAll().spliterator(), false)
                .filter((x) -> x.getUser().getId() == id).toList();
        var wrapper = new Object() {
            int wins = 0;
            int loses = 0;
            int sum = 0;
        };
        records.stream().forEach((x) -> {
            wrapper.wins = wrapper.wins + x.getWins();
            wrapper.loses = wrapper.loses + x.getLoses();
            wrapper.sum += x.getPoints();
        });
        var stats = new UserStats();
        stats.setWins(wrapper.wins);
        stats.setLoses(wrapper.loses);
        if (records.size() > 0) {
            stats.setAveragePoints(((float) wrapper.sum) / records.size());
        } else {
            stats.setAveragePoints(0.0f);
        }
        return stats;
    }

}