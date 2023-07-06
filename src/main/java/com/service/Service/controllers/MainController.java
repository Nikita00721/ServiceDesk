package com.service.Service.controllers;

import com.service.Service.models.RequestType;
import org.springframework.ui.Model;
import com.service.Service.repo.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Optional;

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

    @PostMapping("/delete")
    public String deleteRequest(@RequestParam Long requestId) {
        requestTypeRepository.deleteById(requestId);
        return "redirect:/types";
    }

    @GetMapping("/{id}/type-edit")
    public String typeEdit(@PathVariable(value = "id") long id, Model model) {
        if(!requestTypeRepository.existsById(id)){
            return "redirect:/types";
        }
        Optional<RequestType> post = requestTypeRepository.findById(id);
        ArrayList<RequestType> res = new ArrayList<>();
        post.ifPresent(res::add);
        model.addAttribute("reqtype", res);
        return "type-edit";
    }

    @PostMapping("/{id}/type-edit")
    public String blogPostUpdate(@PathVariable(value = "id") long id, @RequestParam String name, @RequestParam String description, Model model) {
        RequestType requestType = requestTypeRepository.findById(id).orElseThrow();
        requestType.setName(name);
        requestType.setDescription(description);
        requestTypeRepository.save(requestType);
        return "redirect:/types";
    }
}
