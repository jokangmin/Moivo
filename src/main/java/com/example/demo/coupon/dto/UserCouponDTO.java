package com.example.demo.coupon.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCouponDTO {

    private Long userCouponId; // 사용자 쿠폰 고유 ID
    private Long userId; // 사용자 ID
    private Long couponId; // 쿠폰 ID
    private LocalDateTime startDate; // 쿠폰 발급 시작 일자
    private LocalDateTime endDate; // 쿠폰 발급 종료 일자
    private Boolean isUsed; // 쿠폰 사용 여부 
}
