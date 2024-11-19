package com.example.demo.user.entity;

import com.example.demo.store.entity.ProductEntity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "wish")
public class WishEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishseq")
    private int wishSeq; // 찜 고유 키

    @ManyToOne
    @JoinColumn(name = "userseq", nullable = false)
    private UserEntity userEntity; // 고객 고유 키

    @ManyToOne
    @JoinColumn(name = "productseq", nullable = false)
    private ProductEntity productEntity; // 상품 고유 키
}