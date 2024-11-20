package com.example.demo.store.dto;

import com.example.demo.store.entity.ProductEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO { // 상품
    private int productSeq;
    private String name;
    private String img;
    private String content;
    private int price;

    // entity => dto 변환
    public static ProductDTO toProductDTO(ProductEntity entity) {
        ProductDTO dto = new ProductDTO();
        dto.setProductSeq(entity.getProductSeq());
        dto.setName(entity.getName());
        // dto.setImg(entity.getImg());
        dto.setContent(entity.getContent());
        dto.setPrice(entity.getPrice());

        return dto;
    }
}
