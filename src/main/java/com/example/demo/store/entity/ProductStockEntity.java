package com.example.demo.store.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "productstock")
public class ProductStockEntity {

    public enum Size {
        SIZE_1("1"),
        SIZE_2("2"),
        SIZE_3("3");

        private final String value;

        Size(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stockseq")
    private int stockSeq; // 재고 고유 키

    // 사이즈 3개 : 상품 1개
    @ManyToOne
    @JoinColumn(name = "productseq", nullable = false)
    private ProductEntity productEntity; // 상품 고유 키 (Product 테이블과 연관)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size; // 상품 사이즈 (1, 2, 3)

    @Column(nullable = false)
    private int count; // 재고 수량
}
