package com.example.demo.user.service;

import java.util.Map;

import com.example.demo.user.dto.UserDTO;

public interface UserService {
    public int insert(UserDTO user);

    public Map<String, Object> login(int id, String pwd);

    public void logout(String token);
}
