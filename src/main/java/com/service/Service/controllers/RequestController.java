package com.service.Service.controllers;

import com.service.Service.models.Request;
import com.service.Service.models.RequestType;
import com.service.Service.repo.RequestRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.ui.Model;
import com.service.Service.repo.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
public class RequestController {
    @Autowired
    private RequestTypeRepository requestTypeRepository;
    private RequestRepository requestRepository;

    @Autowired
    public RequestController(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }



    @PostMapping("/request-add")
    public String ReqAdd(@RequestParam Long requestType, @RequestParam String fullName,
                         @RequestParam String email, @RequestParam String description, Model model) {
        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(requestType);
        if (fullName.isEmpty() || email.isEmpty() || description.isEmpty()) {
            model.addAttribute("error", "Пожалуйста, заполните все поля");
            Iterable<RequestType> reqtypes = requestTypeRepository.findAll();
            model.addAttribute("reqtypes", reqtypes);
            return "home";
        }
        if (requestTypeOptional.isPresent()) {
            RequestType selectedRequestType = requestTypeOptional.get();

            Request request = new Request();
            request.setFullName(fullName);
            request.setEmail(email);
            request.setDescription(description);
            request.setRequestType(selectedRequestType);
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
            List<Request> requests = requestRepository.findByRequestType(requestType);
            model.addAttribute("requests", requests);
            model.addAttribute("requestType", requestType);
        }
        return "requests-by-type";
    }

    @PostMapping("/request-by-type/{id}/delete")
    public String reqDelete(@PathVariable(value = "id") long id, HttpServletRequest servletRequest) {
        Request deleteRequest = requestRepository.findById(id).orElseThrow();
        requestRepository.delete(deleteRequest);

        String referer = servletRequest.getHeader("Referer");
        String[] parts = referer.split("/");
        String requestTypeId = parts[parts.length - 1];

        return "redirect:/requests/" + requestTypeId;
    }

    @GetMapping("/request-edit/{id}")
    public String getRequestEditPage(@PathVariable Long id, Model model) {
        Iterable<RequestType> reqtypes = requestTypeRepository.findAll();
        model.addAttribute("reqtypes", reqtypes);
        Optional<Request> requestOptional = requestRepository.findById(id);
        if (requestOptional.isPresent()) {
            Request request = requestOptional.get();
            model.addAttribute("request", request);
        }
        return "request-edit";
    }

    @PostMapping("/request-update")
    public String updateRequest(@ModelAttribute("request") Request updatedRequest) {
        try {
            if (updatedRequest.getRequestType() == null) {
                throw new IllegalArgumentException("Недопустимый тип заявки");
            }
            RequestType requestType = requestTypeRepository.findById(updatedRequest.getRequestType().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Недопустимый id типа заявки: " + updatedRequest.getRequestType().getId()));
            Request existingRequest = requestRepository.findById(updatedRequest.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Недопустимый id заявки: " + updatedRequest.getId()));
            existingRequest.setFullName(updatedRequest.getFullName());
            existingRequest.setEmail(updatedRequest.getEmail());
            existingRequest.setDescription(updatedRequest.getDescription());
            existingRequest.setRequestType(requestType);
            requestRepository.save(existingRequest);
            String redirectUrl = "/requests/" + requestType.getId();
            return "redirect:" + redirectUrl;
        } catch (Exception e) {
            return "error-page";
        }
    }

}