package com.example.demo.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.user.dto.UserDTO;
import com.example.demo.user.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    
    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDTO userDTO) {
        int userSeq = userService.insert(userDTO);
        return new ResponseEntity<>("회원가입 성공: " + userSeq, HttpStatus.CREATED);
    }

    //로그인 API
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        try {
            String jwt = userService.login(userDTO.getId(), userDTO.getPwd());
            return ResponseEntity.ok(jwt); // JWT 반환
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    //소셜 로그인



}
