package com.example.demo.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.store.service.ReviewService;

@RestController
@RequestMapping("/api/store/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    // 리뷰 작성
    // 리뷰 수정
    // 리뷰 삭제
}
