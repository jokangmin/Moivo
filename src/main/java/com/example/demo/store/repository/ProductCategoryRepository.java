package com.example.demo.store.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.store.entity.ProductCategoryEntity;

public interface ProductCategoryRepository extends CrudRepository<ProductCategoryEntity, Integer> {

    // JPQL 쿼리로 최대 categorySeq를 찾음
    @Query("SELECT MAX(pc.categorySeq) FROM ProductCategoryEntity pc")
    Integer findMaxCategorySeq();
}