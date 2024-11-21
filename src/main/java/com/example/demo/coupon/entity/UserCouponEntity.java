package com.example.demo.coupon.entity;

import java.time.LocalDateTime;

import com.example.demo.user.entity.UserEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "usercoupon") 
public class UserCouponEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userCouponId; // 사용자 쿠폰 고유 ID
    
    @OneToOne
    @JoinColumn(name = "userId") // 사용자 정보와 연결
    private UserEntity user; // 한 명의 사용자는 자신의 등급에 맞는 하나의 쿠폰만 가질 수 있음
    
    @ManyToOne
    @JoinColumn(name = "couponId") // 쿠폰 정보와 연결
    private CouponEntity coupon; // 하나의 쿠폰은 여러 명의 사용자에게 발급될 수 있음
    
    private LocalDateTime startDate; // 쿠폰 발급 시작 일자
    private LocalDateTime endDate; // 쿠폰 발급 종료 일자
    private Boolean isUsed; // 쿠폰 사용 여부
}
