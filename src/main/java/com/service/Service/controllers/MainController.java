package com.service.Service.controllers;

import com.service.Service.models.RequestType;
import org.springframework.ui.Model;
import com.service.Service.repo.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {
    @Autowired
    private RequestTypeRepository requestTypeRepository;

   @GetMapping("/")
    public String home(Model model) {
        Iterable<RequestType> reqtypes = requestTypeRepository.findAll();
        model.addAttribute("reqtypes", reqtypes);
        return "home";
    }

    @GetMapping("/type-add")
    public String postAdd(Model model) {return "type-add";}

    @PostMapping("/type-add")
    public String ReqTypeAdd(@RequestParam String name, @RequestParam String description, Model model) {
        RequestType requestType = new RequestType(name, description);
        requestTypeRepository.save(requestType);
        return "redirect:/";
    }

    @GetMapping("/types")
    public String Types(Model model) {
        Iterable<RequestType> reqtypes = requestTypeRepository.findAll();
        model.addAttribute("reqtypes", reqtypes);
        return "types";
   }
}
