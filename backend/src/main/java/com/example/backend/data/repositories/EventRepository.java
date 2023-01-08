package com.example.backend.data.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.backend.data.Event;

public interface EventRepository extends CrudRepository<Event, Integer> {

}