package com.example.backend.data.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.backend.data.QueueEntry;

public interface QueueEntryRepository extends CrudRepository<QueueEntry, Integer> {

}
