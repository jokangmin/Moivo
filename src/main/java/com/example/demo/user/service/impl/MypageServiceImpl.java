package com.example.demo.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.user.repository.AttendanceRepository;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.service.MypageService;

@Service
public class MypageServiceImpl implements MypageService {
    @Autowired
    private UserRepository userRepository; // 사용자

    @Autowired
    private AttendanceRepository attendanceRepository; // 출석
}
