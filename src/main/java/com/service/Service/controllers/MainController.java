package com.service.Service.controllers;

import com.service.Service.models.RequestType;
import com.service.Service.repo.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @Autowired
    private RequestTypeRepository requestTypeRepository;

    @GetMapping("/")
    public String main(Model model) {
        Iterable<RequestType> reqtypes = requestTypeRepository.findAll();
        model.addAttribute("reqtypes", reqtypes);
        return "main";
    }
}
