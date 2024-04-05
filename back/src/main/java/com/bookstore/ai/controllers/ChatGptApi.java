package com.bookstore.ai.controllers;

import org.springframework.ai.chat.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/chat")
public class ChatGptApi {
    @Autowired
    private OpenAiChatClient chatClient;

    @PostMapping("/getResponse")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ChatResponse askQuestion(@RequestBody String question){
        return chatClient.call(new Prompt(question));
    }

}
