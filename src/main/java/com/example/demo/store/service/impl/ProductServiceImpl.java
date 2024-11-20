package com.example.demo.store.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.ncp.service.NCPObjectStorageService;
import com.example.demo.store.dto.ProductDTO;
import com.example.demo.store.dto.ProductImgDTO;
import com.example.demo.store.dto.ReviewDTO;
import com.example.demo.store.entity.ProductCategoryEntity;
import com.example.demo.store.entity.ProductEntity;
import com.example.demo.store.entity.ProductImgEntity;
import com.example.demo.store.entity.ProductStockEntity;
import com.example.demo.store.entity.ReviewEntity;
import com.example.demo.store.entity.ProductStockEntity.Size;
import com.example.demo.store.repository.ProductCategoryRepository;
import com.example.demo.store.repository.ProductImgRepository;
import com.example.demo.store.repository.ProductRepository;
import com.example.demo.store.repository.ProductStockRepository;
import com.example.demo.store.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImgRepository imgRepository;

    @Autowired
    private ProductCategoryRepository categoryRepository;

    @Autowired
    private ProductStockRepository stockRepository;

    @Autowired
    private NCPObjectStorageService ncpObjectStorageService;

    @Override
    public Map<String, Object> getProduct(int productSeq) {
        Map<String, Object> map = new HashMap<>();

        // 1. 상품 정보 추출
        ProductEntity productEntity = productRepository.findById(productSeq).orElseThrow(null);
        map.put("product", ProductDTO.toProductDTO(productEntity));

        // 2. 이미지 추출
        List<ProductImgDTO> imgList = new ArrayList<>();
        for (ProductImgEntity imgEntity : productEntity.getImgList()) {
            ProductImgDTO imgDTO = ProductImgDTO.toGetProductImgDTO(imgEntity);
            imgList.add(imgDTO);
            System.out.println(imgDTO);
        }
        map.put("imgList", imgList);

        // 3. 리뷰 추출
        List<ReviewDTO> reviewList = new ArrayList<>();
        for (ReviewEntity reviewEntity : productEntity.getReviewList()) {
            ReviewDTO reviewDTO = ReviewDTO.toGetReviewDTO(reviewEntity);
            reviewList.add(reviewDTO);
            System.out.println(reviewDTO);
        }
        map.put("reviewList", reviewList);

        return map;
    }

    @Override
    @SuppressWarnings("unchecked")
    public void saveProduct(Map<String, Object> map) { // 재고 관련 매개 변수 필요

        // 1. 상품 DTO => Entity
        ProductEntity productEntity = ProductEntity.toSaveProductEntity((ProductDTO) map.get("ProductDTO"));
        // 1-1. 카테고리 Entity 가져와서 저장
        ProductCategoryEntity categoryEntity = categoryRepository
                .findById(Integer.parseInt(map.get("CategorySeq").toString())).orElse(null);
        productEntity.setCategoryEntity(categoryEntity);

        // 1-2. 상품 테이블에 저장
        int productSeq = productRepository.save(productEntity).getProductSeq(); // DB에 저장된 기본키 반환
        System.out.println("saveProduct: " + productEntity);
        System.out.println("saveProduct: " + productSeq);
        productEntity.setProductSeq(productSeq);
        System.out.println("saveProduct: " + productEntity);

        // 2. NCP & DB에 이미지 저장
        for (int i = 1; i < 4; i++) {
            List<MultipartFile> files = (List<MultipartFile>) map.get("layer" + i);
            saveImgFiles(files, productEntity, i);
        }

        // 3. 재고 저장
        // 사이즈 1: 2개
        ProductStockEntity stockEntity = new ProductStockEntity();
        stockEntity.setProductEntity(productEntity);
        stockEntity.setSize(Size.SIZE_1);
        stockEntity.setCount(2);

        stockRepository.save(stockEntity);

    }

    // NCP 업로드 & 이미지 테이블에 Data 저장
    private void saveImgFiles(List<MultipartFile> files, ProductEntity product, int layer) {
        for (MultipartFile file : files) {
            try {
                // NCP Object Storage 업로드
                String fileName = ncpObjectStorageService.uploadFile("moivo", "products/", file);

                // 데이터베이스에 저장할 ProductImgEntity 생성
                ProductImgEntity imgEntity = new ProductImgEntity();
                imgEntity.setProductEntity(product);
                imgEntity.setFileName(fileName);
                imgEntity.setOriginalFileName(file.getOriginalFilename());
                imgEntity.setLayer(layer); // 레이어 값 설정

                // ProductImgRepository에 저장
                imgRepository.save(imgEntity);

                // 로그 출력
                System.out.println("Saved image for layer " + layer + ": " + fileName);
            } catch (Exception e) {
                System.err.println("File upload failed for layer " + layer + ": " + e.getMessage());
            }
        }
    }
}
