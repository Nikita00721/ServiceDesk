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
import java.util.List;
import java.util.Optional;

@Controller
public class RequestController {
    @Autowired
    private RequestTypeRepository requestTypeRepository;

    @Autowired
    RequestRepository requestRepository;

    @PostMapping("/request-add")
    public String ReqAdd(@RequestParam Long requestType, @RequestParam String fullName,
                         @RequestParam String email, @RequestParam String description, Model model) {
        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(requestType);
        if (requestTypeOptional.isPresent()) {
            RequestType selectedRequestType = requestTypeOptional.get();

            Request request = new Request();
            request.setFullName(fullName);
            request.setEmail(email);
            request.setDescription(description);
            request.setType(selectedRequestType);
            request.setSubmissionDate(new Date());

            requestRepository.save(request);
        }

        return "redirect:/";
    }

    @GetMapping("/requests/{requestTypeId}")
    public String getRequestsByType(@PathVariable Long requestTypeId, Model model) {
        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(requestTypeId);
        if (requestTypeOptional.isPresent()) {
            RequestType requestType = requestTypeOptional.get();
            List<Request> requests = requestRepository.findByType(requestType);
            model.addAttribute("requests", requests);
            model.addAttribute("requestType", requestType);
        }
        return "requests-by-type";
    }
}