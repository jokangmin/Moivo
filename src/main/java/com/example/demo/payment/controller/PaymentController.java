package com.example.demo.payment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.payment.service.PaymentService;

@RestController
@RequestMapping("/api/pay")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    // 기능 정리 필요
}
