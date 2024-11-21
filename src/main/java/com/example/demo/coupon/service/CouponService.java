package com.example.demo.coupon.service;


import java.util.List;

import com.example.demo.coupon.dto.CouponDTO;
import com.example.demo.user.dto.UserDTO;
import com.example.demo.user.entity.UserEntity;

public interface CouponService {
    List<CouponDTO> getAllCoupons();
    CouponDTO getCouponById(Long id);

    // 사용자에게 쿠폰 발급
    void issueCouponsForUsers(List<UserEntity> userlist);

    // 유효기간이 지난 쿠폰 만료 처리
    void expireOldCoupons();
}
