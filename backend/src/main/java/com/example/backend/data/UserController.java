package com.example.backend.data;

import java.security.Principal;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import com.example.backend.data.repositories.QueueEntryRepository;
import com.example.backend.data.repositories.UserRepository;

@Controller
@Secured("ROLE_NORMAL")
public class UserController {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private QueueEntryRepository queueEntryRepository;

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

  @MutationMapping
  public String deleteUser(@Argument(name = "id") int id) {

    userRepository.deleteById(id);

    return "Deleted";
  }

  @QueryMapping
  public Iterable<User> users() {
    return userRepository.findAll();
  }

  @QueryMapping
  public User userByID(@Argument(name = "id") int id) {
    return userRepository.findById(id).get();
  }

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

}