package com.example.demo.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.store.service.ProductService;

@Controller
@RequestMapping("/api/store")
public class StoreController {
    @Autowired
    private ProductService productService;
    // 상품 페이징 처리
    // 상품 검색
    // 상품 상세 화면 (리뷰 포함)
}
