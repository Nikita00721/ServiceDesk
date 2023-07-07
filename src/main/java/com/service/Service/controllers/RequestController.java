package com.service.Service.controllers;

import com.service.Service.models.Request;
import com.service.Service.models.RequestType;
import com.service.Service.repo.RequestRepository;
import org.springframework.ui.Model;
import com.service.Service.repo.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Controller
public class RequestController {
    @Autowired
    private RequestTypeRepository requestTypeRepository;

    @Autowired
    RequestRepository requestRepository;

    @PostMapping("/request-add")
    public String ReqAdd(@RequestParam String requestType, @RequestParam String fullName,
                         @RequestParam String email, @RequestParam String description, Model model) {
        Request request = new Request(requestType, fullName, email, new Date(), description);
        requestRepository.save(request);
        return "redirect:/";
    }
}