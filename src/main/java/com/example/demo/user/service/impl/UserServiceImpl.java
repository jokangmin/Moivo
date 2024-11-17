package com.example.demo.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.service.UserService;

public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository; // 사용자
}
