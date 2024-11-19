package com.example.demo.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.user.dto.UserDTO;
import com.example.demo.user.service.MypageService;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequestMapping("/api/mypage")
public class MypageController {

    @Autowired
    private MypageService mypageService;

    // 회원 정보
    @GetMapping("/info")
    public UserDTO info() {
        UserDTO userDTO = new UserDTO();

        return userDTO;
    }

    // 주문내역 조회
    // 주문 내역 상세 조회
    // 쿠폰 및 적립금 확인
    // 회원정보 수정
    // 회원 탈퇴
    // 출석
    // 찜
}
