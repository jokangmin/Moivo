package com.example.demo.coupon.controller;

import com.example.demo.coupon.dto.CouponDTO;
import com.example.demo.coupon.service.CouponService;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/issue")
    public void issueCouponsForUsers(@RequestBody List<Long> userId) {
        // 사용자 ID를 기반으로 사용자 정보를 가져오고, 쿠폰을 발급하는 로직
        List<UserEntity> users = userRepository.findAllById(id); // 사용자를 조회하는 로직 추가 필요
        couponService.issueCouponsForUsers(users);
    }

    // 쿠폰 목록 조회
    @GetMapping
    public List<CouponDTO> getAllCoupons() {
        return couponService.getAllCoupons();
    }

    // 쿠폰 ID로 조회
    @GetMapping("/{id}")
    public CouponDTO getCouponById(@PathVariable Long id) {
        return couponService.getCouponById(id);
    }
}
