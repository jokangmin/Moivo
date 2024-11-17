package com.example.demo.user.entity;

import java.util.List;

import com.example.demo.store.entity.ProductEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "cart")
public class CartEntity { // 장바구니

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartseq;

    // 장바구니 1개 : 사용자 1명
    @OneToOne
    @JoinColumn(name = "userseq")
    private UserEntity user;

    // 장바구니 1개 : 상품 n개
    @OneToMany(mappedBy = "cartEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProductEntity> productList;

    @Column(name = "size", length = 10)
    private String size; // 상품 사이즈

    @Column(name = "count")
    private int count; // 상품 수량
}

// public class ItemEntity {

// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// @Column(name = "id", nullable = false)
// private Integer id;

// @ManyToOne
// @JoinColumn(name = "bucketTb_id")
// private BucketEntity bucketEntity;

// }

// public class BucketEntity {

// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// @Column(name = "id", nullable = false)
// private Integer id;

// @OneToOne
// @JoinColumn(name = "userTb_id")
// private UserEntity userEntity;

// @OneToMany(mappedBy = "bucketEntity", cascade = CascadeType.ALL, fetch =
// FetchType.EAGER)
// private List<ItemEntity> itemList;

// // 1. user
// // 2. bucket
// // 3. item

// }