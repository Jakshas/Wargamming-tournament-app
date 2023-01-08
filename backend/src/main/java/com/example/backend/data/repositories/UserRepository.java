package com.example.backend.data.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.backend.data.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}