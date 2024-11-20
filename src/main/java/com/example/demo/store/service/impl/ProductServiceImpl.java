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


    //스토어 리스트 가져오기
    //배너 들어가는 데이터 보고 수정필요
    @Override
    public Map<String, Object> storeList() {
        List<ProductEntity> list = productRepository.findAll();

        Map<String, Object> map = new HashMap<>();
        map.put("list", list);
        return map;
    }

    //상품 검색 기능
    @Override
    public Map<String, Object> productSearch(String keyword, Pageable pageable) {
        return productService(pageable, keyword, productRepository.findByNameContainingIgnoreCase(keyword, pageable)); //키워드를 포함한 상품을 대,소문자 구분없이 검색
    }

    //상품 리스트
    @Override
    public Map<String, Object> productList(Pageable pageable) {
        return productService(pageable, null, productRepository.findAll(pageable)); //모든 상품검색해서 페이징처리
    }

    //리팩토링 코드
    private Map<String, Object> productService(Pageable pageable, String keyword, Page<ProductEntity> list) {
        // 총 데이터 개수 및 페이지 수 계산
        int totalElements = (int) (keyword == null ? productRepository.count() : productRepository.countByNameContainingIgnoreCase(keyword));
        int totalPages = list.getTotalPages(); //페이징처리된 페이지의 총 개수

        // 페이지 번호 검증
        if (pageable.getPageNumber() >= totalPages) {
            throw new IllegalArgumentException("유효하지 않은 페이지입니다.");
        }

        // 페이징 처리
        paging(pageable, totalElements);

        // 응답 생성
        Map<String, Object> map = new HashMap<>();
        if (list.isEmpty()) {
            map.put("message", (keyword == null ? "상품이 없습니다" : keyword + "에 대한 검색 결과 없음"));
        } else {
            map.put("list", list);
        }
        map.put("productPaging", productPaging);
        return map;
    }


    private void paging(Pageable pageable, int totalA) {
        productPaging.setCurrentPage(pageable.getPageNumber() + 1); //page = 0 이면 1 페이지, page = 1 이면 2 페이지
        productPaging.setPageBlock(5);
        productPaging.setPageSize(9);
        productPaging.setTotalA(totalA);
        productPaging.makePagingHTML();
    }


    // 상품 상세 화면 (리뷰 포함)

}
