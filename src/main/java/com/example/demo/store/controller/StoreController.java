package com.example.demo.store.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.ncp.service.NCPObjectStorageService;
import com.example.demo.store.entity.ProductCategoryEntity;
import com.example.demo.store.entity.ProductEntity;
import com.example.demo.store.entity.ProductImgEntity;
import com.example.demo.store.repository.ProductCategoryRepository;
import com.example.demo.store.repository.ProductImgRepository;
import com.example.demo.store.repository.ProductRepository;

@Controller
@RequestMapping("/api/store")
public class StoreController {

   @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImgRepository productImgRepository;
    
    @Autowired
    private NCPObjectStorageService ncpObjectStorageService;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;
    // 상품 페이징 처리
    // 상품 검색
    // 상품 상세 화면 (리뷰 포함)

    // 상품 이미지 조회 API
    @GetMapping("/product/{productSeq}/images")
    public ResponseEntity<List<ProductImgEntity>> getProductImages(@PathVariable int productSeq) {
        List<ProductImgEntity> images = productImgRepository.findByProductEntity_ProductSeq(productSeq);
        return ResponseEntity.ok(images);
    }

    // 상품 업로드 API
    @PostMapping("/upload")
    public ResponseEntity<String> uploadProduct(
            @RequestPart("layer1") List<MultipartFile> layer1Files,
            @RequestPart("layer2") List<MultipartFile> layer2Files,
            @RequestPart("layer3") List<MultipartFile> layer3Files,
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("content") String content) {
        // 상품 엔티티 생성
        ProductEntity product = new ProductEntity();
        product.setName(name);
        product.setPrice(price);
        product.setContent(content);

        // 카테고리 자동 증가 처리
        Integer maxCategorySeq = productCategoryRepository.findMaxCategorySeq();
        int newCategorySeq = (maxCategorySeq != null ? maxCategorySeq : 0) + 1;

        ProductCategoryEntity category = new ProductCategoryEntity();
        category.setCategoryseq(newCategorySeq);
        category.setName("자동 생성 카테고리 " + newCategorySeq);

        ProductCategoryEntity savedCategory = productCategoryRepository.save(category);

        product.setCategoryEntity(savedCategory);

        // 대표 이미지 설정 (Layer 1의 첫 번째 이미지 사용)
        if (!layer1Files.isEmpty()) {
            MultipartFile representativeFile = layer1Files.get(0);
            String representativeFileName = UUID.randomUUID().toString() + "_" + representativeFile.getOriginalFilename();
            String representativeFileUrl = ncpObjectStorageService.uploadFile("moivo", "products/" + representativeFileName, representativeFile);
            product.setImg(representativeFileUrl); // 대표 이미지 설정
        }

        // 상품 저장
        ProductEntity savedProduct = productRepository.save(product);

        // 레이어별 파일 저장
        saveFiles(layer1Files, savedProduct, 1); // layer1 저장
        saveFiles(layer2Files, savedProduct, 2); // layer2 저장
        saveFiles(layer3Files, savedProduct, 3); // layer3 저장

        return ResponseEntity.ok("상품 업로드 완료");
    }

    private void saveFiles(List<MultipartFile> files, ProductEntity product, int layer) {
        for (MultipartFile file : files) {
            try {
                // 파일 이름 생성 및 저장
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

                // NCP Object Storage 업로드
                String fileUrl = ncpObjectStorageService.uploadFile("moivo", "products/" + fileName, file);

                // 데이터베이스에 저장할 ProductImgEntity 생성
                ProductImgEntity img = new ProductImgEntity();
                img.setProductEntity(product);
                img.setFileName(fileName);
                img.setOriginalFileName(file.getOriginalFilename());
                img.setLayer(layer); // 레이어 값 설정
                img.setFileUrl(fileUrl); // 업로드된 파일 URL 설정

                // ProductImgRepository에 저장
                productImgRepository.save(img);

                // 로그 출력
                System.out.println("Saved image for layer " + layer + ": " + fileUrl);
            } catch (Exception e) {
                System.err.println("File upload failed for layer " + layer + ": " + e.getMessage());
            }
        }
    }


}
