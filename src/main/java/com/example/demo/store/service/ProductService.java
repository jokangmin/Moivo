package com.example.demo.store.service;

import java.util.List;
import java.util.Map;

import com.example.demo.store.dto.ProductCategoryDTO;

public interface ProductService {

    public Map<String, Object> getProduct(int productSeq);

    public void saveProduct(Map<String, Object> map);

    public Map<String, Object> getProductList();

    public List<ProductCategoryDTO> getCategory();

}