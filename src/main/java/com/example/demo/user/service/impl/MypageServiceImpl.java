package com.example.demo.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.user.dto.UserDTO;
import com.example.demo.user.dto.WishDTO;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.AttendanceRepository;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.repository.WishRepository;
import com.example.demo.user.service.CouponDTO;
import com.example.demo.user.service.MypageService;
import com.example.demo.user.service.OrderDTO;

@Service
public class MypageServiceImpl implements MypageService {
    @Autowired
    private UserRepository userRepository; // 사용자
    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private WishRepository wishRepository;
    @Autowired
    private OrderRepository orderRepository;
    // @Autowired
    //private AttendanceRepository attendanceRepository; // 출석

    @Override
    public UserDTO getUserInfo(int userseq) {
        UserEntity userEntity = userRepository.findById(userseq);

        return userEntity.toDTO();
        
    }

    @Override
    public List<CouponDTO> getCouponList(int userseq) {
        CouponEntity couponEntity = couponRepository.findBy

        return couponEntity.toDTO();
    }

    @Override
    public List<WishDTO> getWishlist(int userSeq) {
        
        return listEntity.toDTO();
    }

    @Override
    public List<OrderDTO> getOrders(int userSeq) {
        
        return orderEntity.toDTO();
    }
}
