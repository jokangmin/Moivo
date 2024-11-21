package com.example.demo.coupon.service.impl;

import com.example.demo.coupon.dto.CouponDTO;
import com.example.demo.coupon.entity.CouponEntity;
import com.example.demo.coupon.entity.UserCouponEntity;
import com.example.demo.coupon.repository.CouponRepository;
import com.example.demo.coupon.repository.UserCouponRepository;
import com.example.demo.coupon.service.CouponService;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.entity.UserEntity.Grade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CouponServiceImpl implements CouponService {

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private UserCouponRepository userCouponRepository;

    // 다음 달 1일 계산
    private LocalDate getNextMonthFirstDay() {
        LocalDate today = LocalDate.now();
        return today.plusMonths(1).withDayOfMonth(1);
    }

    // 다음 달 말일 계산
    private LocalDate getNextMonthLastDay() {
        LocalDate firstDay = getNextMonthFirstDay();
        return firstDay.with(TemporalAdjusters.lastDayOfMonth());
    }

    // 사용자에게 쿠폰 발급
    @Override
    public void issueCouponsForUsers(List<UserEntity> userlist) {
        LocalDate startDate = getNextMonthFirstDay();  // 1월 1일
        LocalDate endDate = getNextMonthLastDay();     // 1월 31일

        for (UserEntity user : userlist) {
            Grade currentGrade = user.getGrade(); // 사용자의 현재 등급
            CouponEntity newCoupon = couponRepository.findByGrade(currentGrade); // 새로운 등급의 쿠폰 조회

            if (newCoupon != null) {
                // 중복 발급 방지: 같은 기간에 동일 쿠폰이 이미 발급되었는지 확인
                if (userCouponRepository.existsByUserIdAndCouponIdAndStartDate(user.getId(), newCoupon.getId(), startDate.atStartOfDay())) {
                    continue; // 이미 발급된 경우, 다음 사용자로 이동
                }

                // 새로운 등급의 쿠폰 발급
                UserCouponEntity userCoupon = new UserCouponEntity();
                userCoupon.setUser(user);
                userCoupon.setCoupon(newCoupon);
                userCoupon.setStartDate(startDate.atStartOfDay());
                userCoupon.setEndDate(endDate.atTime(23, 59, 59));
                userCoupon.setIsUsed(false);

                userCouponRepository.save(userCoupon); // 쿠폰 저장
            }
        }
    }

    // 유효기간이 지난 쿠폰 만료 처리
    @Override
    public void expireOldCoupons() {
        LocalDate now = LocalDate.now(); // 현재 시간
        userCouponRepository.updateExpiredCoupons(now); // 유효기간이 지난 쿠폰 만료 처리
    }

    // 모든 쿠폰 정보를 가져옴
    @Override
    public List<CouponDTO> getAllCoupons() {
        return couponRepository.findAll().stream() // 모든 쿠폰 가져오기
                .map(coupon -> new CouponDTO(
                        coupon.getId(),
                        coupon.getName(),
                        coupon.getGrade(),
                        coupon.getDiscountType(),
                        coupon.getDiscountValue(),
                        coupon.getMinOrderPrice(),
                        coupon.getIsActive()
                ))
                .collect(Collectors.toList()); // 변환된 DTO를 List에 담아서 반환
    }

    // 특정 쿠폰 정보를 id로 가져오기
    @Override
    public CouponDTO getCouponById(Long id) {
        CouponEntity coupon = couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found"));

        return new CouponDTO(
                coupon.getId(),
                coupon.getName(),
                coupon.getGrade(),
                coupon.getDiscountType(),
                coupon.getDiscountValue(),
                coupon.getMinOrderPrice(),
                coupon.getIsActive()
        );
    }
}
