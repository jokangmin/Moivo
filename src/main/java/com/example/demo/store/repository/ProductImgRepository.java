package com.example.demo.store.repository;

import com.example.demo.store.entity.ProductImgEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductImgRepository extends JpaRepository<ProductImgEntity, Integer> {

    // 특정 상품의 이미지 가져오기
    List<ProductImgEntity> findByProductEntity_ProductSeq(int productSeq);
}
