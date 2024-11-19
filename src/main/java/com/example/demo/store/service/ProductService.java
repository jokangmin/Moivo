package com.example.demo.store.service;

import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface ProductService {

    Map<String, Object> getStoreList();

    Map<String, Object> getProductSearch(String keyword, Pageable pageable);
}
