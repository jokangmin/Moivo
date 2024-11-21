package com.example.demo.user.service;

import java.util.List;

import com.example.demo.user.controller.CouponDTO;
import com.example.demo.user.controller.OrderDTO;
import com.example.demo.user.dto.UserDTO;
import com.example.demo.user.dto.WishDTO;

public interface MypageService {

    UserDTO getUserInfo(int userseq);

    List<CouponDTO> getCouponList(int userseq);

    List<WishDTO> getWishlist(int userSeq);

    List<OrderDTO> getOrders(int userSeq);

}
