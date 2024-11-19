package com.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class NCPObjectStorageService {
    private final AmazonS3 amazonS3;

    public NCPObjectStorageService(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String uploadFile(String bucketName, String directoryPath, File file) {
        String fileName = UUID.randomUUID().toString();
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            ObjectMetadata objectMetadata = new ObjectMetadata();

            Path path = Paths.get(file.getAbsolutePath());
            objectMetadata.setContentType(Files.probeContentType(path));
            objectMetadata.setContentLength(file.length());

            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    bucketName,
                    directoryPath + fileName,
                    fileInputStream,
                    objectMetadata
            ).withCannedAcl(CannedAccessControlList.PublicRead);

            amazonS3.putObject(putObjectRequest);
            return fileName;

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }
}
