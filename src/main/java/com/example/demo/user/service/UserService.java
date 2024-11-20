package com.example.demo.user.service;

import com.example.demo.user.dto.UserDTO;


public interface UserService {
    public int insert (UserDTO user);
    public String login(String id, String pwd);
} 
