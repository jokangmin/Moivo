package com.example.demo.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.store.service.ProductService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/api/store")
public class StoreController {
    @Autowired
    private ProductService productService;

    //상품 데이터 가져오기
    @GetMapping("")
    @ResponseBody
    public Map<String, Object> storeList() {
        return productService.storeList();
    }

    // 상품 검색, 검색한 상품 페이징 처리
    @GetMapping("/search")
    @ResponseBody
    public Map<String, Object> productSearch(@RequestParam("keyword") String keyword,
                                             @PageableDefault(page = 0, size = 9, sort = "seq", direction = Sort.Direction.DESC) Pageable pageable) {

        return productService.productSearch(keyword, pageable);
    }

    @GetMapping("/list")
    @ResponseBody
    public Map<String, Object> productList(@PageableDefault(page = 0, size = 9, sort = "seq", direction = Sort.Direction.DESC) Pageable pageable) {

        return productService.productList(pageable);
    }

    // 상품 상세 화면 (리뷰 포함)

}
