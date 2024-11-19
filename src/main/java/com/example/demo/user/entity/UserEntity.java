package com.example.demo.user.entity;

import java.time.LocalDate;

import com.example.demo.user.dto.UserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class UserEntity { // 사용자 & 관리자

    public enum LoginType {
        GOOGLE, KAKAO, MOIVO, ADMIN
    }

    public enum Grade {
        NEWBIE, FAMILY, SILVER, GOLD, VIP
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userseq")
    private int userSeq;

    @Column(nullable = false, unique = true)
    private String id;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false)
    private String pwd;

    @Column(length = 50)
    private String email;

    @Column(length = 13)
    private String tel;

    private LocalDate birth;
    private String addr1;
    private String addr2;

    @Column(length = 20)
    private String zipcode;

    @Column(length = 2)
    private String gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoginType loginType = LoginType.MOIVO;

    @Column(name = "isAdmin", nullable = false)
    private boolean admin = false; // 기본값 설정

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Grade grade = Grade.FAMILY;

    private double height;
    private double weight;

    public UserDTO toDTO() {
        UserDTO dto = new UserDTO();
        dto.setUserSeq(userSeq);
        dto.setId(id);
        dto.setName(name);
        dto.setPwd(pwd);
        dto.setEmail(email);
        dto.setTel(tel);
        dto.setBirth(birth);
        dto.setAddr1(addr1);
        dto.setAddr2(addr2);
        dto.setZipcode(zipcode);
        dto.setGender(gender);
        dto.setLoginType(loginType);
        dto.setAdmin(admin);
        dto.setGrade(grade);
        dto.setHeight(height);
        dto.setWeight(weight);

        return dto;
    }
}