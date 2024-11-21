package com.example.demo.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishDTO {
    private Integer id; // 찜 고유 키
    private Integer userId; // 고객 고유 키
}
