package com.example.demo.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserEntity user) {
        if (userRepository.findById(user.getId()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디입니다.");
        }

        user.setPwd(passwordEncoder.encode(user.getPwd())); // 비밀번호 암호화
        userRepository.save(user);
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    // 로그인
    // @PostMapping("/login")
    // public ResponseEntity<String> login(@RequestBody UserEntity user) {
    //     UserEntity existingUser = userRepository.findById(user.getId()).orElse(null);
    //     if (existingUser != null && passwordEncoder.matches(user.getPwd(), existingUser.getPwd())) {
    //         String token = jwtUtil.generateToken(user.getId()); // JWT 생성
    //         return ResponseEntity.ok(token); // 클라이언트에 JWT 반환
    //     } else {
    //         return ResponseEntity.status(401).body("로그인 실패: 잘못된 아이디 또는 비밀번호");
    //     }
    // }

    // // 로그인 상태 확인
    // @GetMapping("/check")
    // public ResponseEntity<Boolean> checkLoginStatus(@RequestHeader("Authorization") String token) {
    //     String userId = jwtUtil.validateToken(token.replace("Bearer ", ""));
    //     return ResponseEntity.ok(userId != null);
    // }


}
