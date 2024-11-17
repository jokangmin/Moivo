package com.example.demo.store.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "productimg")
public class ProductImgEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productimgseq")
    private int productImgSeq;

    // 이미지 n개 : 상품 1개
    @ManyToOne
    @JoinColumn(name = "productseq", nullable = false)
    private ProductEntity productEntity; // 상품

    @Column(length = 100, nullable = false)
    private String productFileName; // 이미지 파일 이름

    @Column(length = 100, nullable = false)
    private String productOriginalFileName; // 원본 이미지 파일 이름

    @Column(nullable = false)
    private int productLayer; // 이미지 계층
}
