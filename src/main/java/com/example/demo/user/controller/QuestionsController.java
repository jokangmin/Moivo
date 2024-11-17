package com.example.demo.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.user.service.QuestionsService;

@RestController
@RequestMapping("/api/qna/question")
public class QuestionsController {

    @Autowired
    private QuestionsService questionsService;
    // 고정 문의 & 문의 리스트 출력
    // 문의 사항 검색
}
