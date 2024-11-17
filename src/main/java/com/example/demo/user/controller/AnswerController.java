package com.example.demo.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.user.service.QuestionsService;

@RestController
@RequestMapping("/api/qna/answer")
public class AnswerController {
    @Autowired
    private QuestionsService questionsService;
    // 답변 작성
    // 답변 수정
}