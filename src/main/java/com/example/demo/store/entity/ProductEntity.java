package com.example.demo.store.entity;

import java.util.List;

import com.example.demo.user.entity.CartEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class ProductEntity { // 상품

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productseq")
    private int productSeq;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 200)
    private String img; // 첫 번째 상품 이미지 경로

    @Column(length = 2000)
    private String content; // 상품 설명

    @Column(nullable = false)
    private int price; // 상품 가격

    // 상품 n개 : 카테고리 1개
    @ManyToOne
    @JoinColumn(name = "categoryseq", nullable = false)
    private ProductCategoryEntity categoryEntity;

    // 상품 n개 : 장바구니 1개
    @ManyToOne
    @JoinColumn(name = "cartseq")
    private CartEntity cartEntity;

    // 상품 1개 : 이미지 n개
    @OneToMany(mappedBy = "productEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProductImgEntity> imgList;

    // 상품 1개 : 사이즈 3개
    @OneToMany(mappedBy = "productEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProductStockEntity> stockList;

    // 상품 1개 : 리뷰 n개
    @OneToMany(mappedBy = "productEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ReviewEntity> reviewList;
}
