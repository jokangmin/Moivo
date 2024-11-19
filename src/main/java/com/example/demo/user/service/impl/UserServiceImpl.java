package com.example.demo.user.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.jwt.prop.JwtProps;
import com.example.demo.user.dto.UserDTO;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProps jwtProps;

    @Override
    public int insert(UserDTO userDTO) {
        // DTO -> Entity 변환
        UserEntity userEntity = userDTO.toEntity();
        userEntity.setPwd(passwordEncoder.encode(userDTO.getPwd()));

        // 사용자 저장
        UserEntity savedUser = userRepository.save(userEntity);

        // 저장된 사용자 ID 반환
        return savedUser.getUserSeq();
    }

    @Override
    public String login(String id, String pwd) {
        // ID로 사용자 조회
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        System.out.println("login: " + userEntity);
        // 비밀번호 검증
        if (!passwordEncoder.matches(pwd, userEntity.getPwd())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        // JWT 생성
        byte[] signingKey = jwtProps.getSecretKey().getBytes();
        return Jwts.builder()
                .setSubject(String.valueOf(userEntity.getUserSeq())) // 사용자 식별자
                .claim("roles", userEntity.isAdmin() ? "ROLE_ADMIN" : "ROLE_USER") // 역할 정보
                .signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512) // 서명
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1시간 유효
                .compact();
    }
}
