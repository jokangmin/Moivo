package com.example.demo.store.service.impl;

import com.example.demo.store.dto.ProductPaging;
import com.example.demo.store.entity.ProductEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.store.repository.ProductRepository;
import com.example.demo.store.service.ProductService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductPaging productPaging;


    //데이터 전부 가져오기
    @Override
    public Map<String, Object> getStoreList() {
        List<ProductEntity> list = productRepository.findAll();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("list", list);
        return map;
    }

    //상품 검색
    @Override
    public Map<String, Object> getProductSearch(String keyword, Pageable pageable) {
        Page<ProductEntity> list = productRepository.findByNameContainingIgnoreCase(keyword, pageable);

        //페이지 처리
        int totalA = (int)list.getTotalElements(); //총 검색 갯수

        productPaging.setCurrentPage(pageable.getPageNumber() + 1); //page = 0 이면 1 페이지, page = 1 이면 2 페이지
        productPaging.setPageBlock(10);
        productPaging.setPageSize(5);
        productPaging.setTotalA(totalA);
        productPaging.makePagingHTML();

        if (pageable.getPageNumber() >= list.getTotalPages()) {
            throw new IllegalArgumentException("유효하지 않은 페이지입니다.");
        }

        Map<String, Object> map = new HashMap<>();
        if(list.isEmpty()){ //검색 결과가 없다면
            map.put("message", keyword +"에 대한 검색 결과 없음");
        } else {
            map.put("list", list);
            map.put("productPaging", productPaging);
        }


        return map;
    }
}
