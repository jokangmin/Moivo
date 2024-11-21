package com.example.demo.store.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.store.dto.ProductDTO;
import com.example.demo.store.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/store")

public class StoreController {

    @Autowired
    private ProductService productService;

    // 상품 페이징 처리
    // 상품 검색
    // 상품 상세 화면 (리뷰 포함)
    @GetMapping("/{productSeq}")
    public ResponseEntity<?> getProductDetail(@PathVariable int productSeq) {
        System.out.println(productSeq);
        Map<String, Object> map = productService.getProduct(productSeq);
        // 값 존재 X
        if (map == null)
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body(null);

        // 값 존재 O
        return ResponseEntity.ok(map);
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getProductAll(@PageableDefault(page = 0, size = 9, sort="id", direction = Sort.Direction.DESC) Pageable pageable,
                                                             @RequestParam(required = false, defaultValue = "newest") String sortby) {

    public ResponseEntity<Map<String, Object>> getProductAll() {
        Map<String, Object> map = new HashMap<>();
        if (map == null) {
            map.put("ProductDTO", null);
        } else {
            map.put("ProductDTO", map);
        }
        System.out.println(pageable.getSort().toString());
        return ResponseEntity.ok(productService.getProductList(pageable, sortby));
    }

}