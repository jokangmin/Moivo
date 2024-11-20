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
        System.out.println("=== 로그인 시도 ===");
        System.out.println("받은 ID: " + userDTO.getId());
        System.out.println("받은 비밀번호 길이: " + (userDTO.getPwd() != null ? userDTO.getPwd().length() : "null"));
        
        try {
            String jwt = userService.login(userDTO.getId(), userDTO.getPwd());
            System.out.println("로그인 성공 - JWT 생성됨");
            return ResponseEntity.ok(jwt);
        } catch (RuntimeException e) {
            System.out.println("로그인 실패 - 에러 메시지: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    //소셜 로그인



}
