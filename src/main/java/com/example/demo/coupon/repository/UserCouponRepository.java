package com.example.demo.coupon.repository;

import com.example.demo.coupon.entity.UserCouponEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface UserCouponRepository extends JpaRepository<UserCouponEntity, Long> {
    // 이미 발급된 쿠폰이 있는지 확인하는 메서드
    boolean existsByUserIdAndCouponIdAndStartDate(String userId, Long couponId, LocalDateTime startDate);

    // 유효기간이 지난 쿠폰 만료 처리
    @Modifying
    @Query("UPDATE UserCouponEntity uc SET uc.isUsed = true WHERE uc.endDate < :now AND uc.isUsed = false")
    void updateExpiredCoupons(LocalDate now);
}
