package com.example.demo.store.entity;

import java.time.LocalDateTime;

import com.example.demo.user.entity.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "review")
public class ReviewEntity { // 리뷰
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewseq")
    private int reviewSeq; // 리뷰 고유 키

    // 리뷰 1개 : 사용자 1개
    @OneToOne
    @JoinColumn(name = "userseq", nullable = false)
    private UserEntity userEntity; // 사용자 (리뷰 작성자)

    // 리뷰 n개 : 상품 1개
    @ManyToOne
    @JoinColumn(name = "productseq", nullable = false)
    private ProductEntity productEntity; // 상품 고유 키

    @Column(name = "rating", nullable = false)
    private int rating; // 평점 (1~5)

    @Column(name = "content", nullable = false)
    private String content; // 리뷰 내용

    @Column(name = "reviewdate", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime reviewDate; // 리뷰 작성 일시

}
