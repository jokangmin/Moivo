package com.example.demo.store.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.store.entity.ProductEntity;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    //Page<ProductEntity> findAll(Pageable pageable);

    //상품 검색 (키워드)
    //Containing = 부분검색, IgnoreCase = 대소문자 무시
    //Page<ProductEntity> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

    //카테고리로 상품 검색
    //Page<ProductEntity> findByCategoryContainingIgnoreCase(String category, Pageable pageable);

    //키워드와 카테고리 개수 확인
    //long countByNameContainingIgnoreCaseAndCategory(String keyword, String category);


}
