package com.example.demo.store.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.store.entity.ProductCategoryEntity;

public interface ProductCategoryRepository extends CrudRepository<ProductCategoryEntity, Integer> {

}