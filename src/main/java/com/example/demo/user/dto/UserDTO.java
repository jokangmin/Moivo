package com.example.demo.user.dto;

import java.time.LocalDate;

import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.entity.UserEntity.Grade;
import com.example.demo.user.entity.UserEntity.LoginType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO { // 사용자 & 관리자
    private int userSeq;
    private String id;
    private String name;
    private String pwd;
    private String email;
    private String tel;
    private LocalDate birth;
    private String addr1;
    private String addr2;
    private String zipcode;
    private String gender;
    private LoginType loginType = LoginType.MOIVO;
    private boolean admin = false; // 기본값 설정
    private Grade grade = Grade.FAMILY;
    private double height;
    private double weight;

    public UserEntity toEntity() {
        UserEntity entity = new UserEntity();
        entity.setUserSeq(userSeq);
        entity.setId(id);
        entity.setName(name);
        entity.setPwd(pwd);
        entity.setEmail(email);
        entity.setTel(tel);
        entity.setBirth(birth);
        entity.setAddr1(addr1);
        entity.setAddr2(addr2);
        entity.setZipcode(zipcode);
        entity.setGender(gender);
        entity.setLoginType(loginType);
        entity.setAdmin(admin);
        entity.setGrade(grade);
        entity.setHeight(height);
        entity.setWeight(weight);

        return entity;
    }
}