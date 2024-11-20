package com.example.demo.store.service;

import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface ProductService {

    Map<String, Object> storeList();

    Map<String, Object> productSearch(String keyword, Pageable pageable);

    Map<String, Object> productList(Pageable pageable);
}
