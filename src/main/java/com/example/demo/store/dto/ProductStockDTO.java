package com.example.demo.store.dto;

import com.example.demo.store.entity.ProductStockEntity.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductStockDTO {
    private int stockSeq; // 재고 고유 키
    private ProductDTO productDTO; // 상품 고유 키 (Product 테이블과 연관)
    private Size size; // 상품 사이즈 (1, 2, 3)
    private int count; // 재고 수량
}
