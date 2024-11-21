package com.example.demo.store.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Map;

public interface ProductService {

    public Map<String, Object> getProduct(int productSeq);

    public void saveProduct(Map<String, Object> map);

    public Map<String, Object> getProductList(Pageable pageable, String sortby);

}